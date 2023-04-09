<template>
  <div class="mt-10">
    <h1>{{ $t("tracking.title") }}</h1>
    <v-container style="padding-left: 200px; padding-right: 200px">
      <div class="chip-container">
        <div class="chip" v-for="(chip, i) of chips" :key="chip.label">
          {{ chip }}
          <i class="material-icons" @click="deleteChip(i)">clear</i>
        </div>
        <input
          v-model="currentInput"
          :placeholder="$t('tracking.invoicenumber')"
          @keypress.enter="saveChip"
          @keydown.delete="backspaceDelete"
        />
      </div>
      <div class="mt-5">
        <v-text-field
          outlined
          v-model="phoneNumber"
          :label="$t('tracking.verification')"
        ></v-text-field>
      </div>
      <div class="d-flex justify-space-between">
        <v-btn dark color="pink lighten-1" @click="handleTrack">
          {{ $t("tracking.button") }}
        </v-btn>

        <v-btn dark color="pink lighten-1" @click="handleReload">
          {{ $t("tracking.clear") }}
        </v-btn>
      </div>
    </v-container>
    <v-container>
      <v-data-table
        :loading="isLoading"
        hide-default-footer
        :headers="headers"
        :items="orders"
        :expanded.sync="expanded"
        item-key="orderCode"
        class="elevation-1"
      >
        <template v-slot:expanded-item="{ item }">
          <td></td>
          <td colspan="5" style="padding: 0">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Step name</th>
                    <th class="text-left">Last status</th>
                    <th class="text-left">Created date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(va, index) in item.timeline" :key="index">
                    <td>{{ va.stepName }}</td>
                    <td>{{ va.lastStatus }}</td>
                    <td>{{ va.createdDate }}</td>
                  </tr>
                  <tr v-if="item.timeline.length === 0">
                    <td colspan="3">No matching records found</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>
        </template>

        <template v-slot:item="{ item, index }">
          <tr>
            <td>
              <v-icon
                :class="{ 'rotate-180': item.rotate }"
                @click="onExpand(index)"
              >
                mdi-chevron-down
              </v-icon>
            </td>
            <td>{{ item.orderCode || `-` }}</td>
            <td>{{ item.productName || `-` }}</td>
            <td>{{ item.quantity || `-` }}</td>
            <td>{{ item.lastOrderStatus || `-` }}</td>
            <td>{{ item.remarks }}</td>
            <td>
              <v-icon class="mr-2"  @click="onPrint(item.orderCode)">
                mdi-printer
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>

    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
import LoadingDialog from "../components/dialogs/LoadingDialog.vue";
import PublicTimelineService from "../services/PublicTimeline.service";
import { mapActions } from "pinia";
import { useErrorMessage } from "../store/error-message";
export default {
  components: {
    LoadingDialog,
  },
  props: {
    set: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      chips: [],
      currentInput: "",
      orders: [],
      phoneNumber: "",
      isLoading: false,
      expanded: [],
      headers: [
        { text: "", value: "data-table-expand" },
        { text: "Invoice No.", value: "orderCode" },
        { text: "Product Name", value: "productName" },
        { text: "Quantity", value: "quantity" },
        { text: "Status", value: "lastOrderStatus" },
        { text: "Remarks", value: "remarks" },
        { text: "Action", value: "action" },
      ],
    };
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    handleReload(){
      location.reload();
    },
    onPrint(orderCode){
      this.$router.push(`/order/${orderCode}/invoice`)
    },
    onExpand(index) {
      if (!this.expanded) {
        this.expanded = [];
      }
      this.orders[index].rotate = !this.orders[index].rotate;
      const filterred = this.expanded.filter(
        (it) => it.orderCode == this.orders[index].orderCode
      );
      if (filterred.length > 0) {
        this.expanded = this.expanded.filter(
          (it) => it.orderCode != this.orders[index].orderCode
        );
      } else {
        this.expanded.push(this.orders[index]);
      }
    },
    async handleTrack() {
      try {
        this.isLoading = true;
        this.orders = await PublicTimelineService.trackOrders({
          orderCodes: this.chips.toString(),
          phoneNumber: this.phoneNumber,
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
    saveChip() {
      const { chips, currentInput, set } = this;
      if ((set && chips.indexOf(currentInput) === -1) || !set) {
        if (chips.length <= 2) {
          chips.push(currentInput);
        }
      }
      this.currentInput = "";
    },
    deleteChip(index) {
      this.chips.splice(index, 1);
    },
    backspaceDelete({ which }) {
      which == 8 &&
        this.currentInput === "" &&
        this.chips.splice(this.chips.length - 1);
    },
  },
};
</script>

<style scoped>
div {
  text-align: left;
}
h1 {
  text-align: center;
  margin: 70px auto;
}
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  border-color: black;
  background-color: #ffffff;
}
input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

/* autocomplete */
.chip-container {
  border: 1px solid #ccc;
  border-radius: 2px;
  min-height: 34px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-color: rgb(46, 46, 46);
}
.chip {
  margin: 4px;
  background: #e0e0e0;
  padding: 0px 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: flex;
  align-items: center;
}
.chip i {
  cursor: pointer;
  opacity: 0.56;
  margin-left: 8px;
}

input {
  flex: 1 1 auto;
  width: 30px;
  border: none;
  outline: none;
  padding: 4px;
}
</style>
