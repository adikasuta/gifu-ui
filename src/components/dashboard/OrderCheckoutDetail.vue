<template>
  <div>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.dashboard.detailpayment") }}
      </template>
      <template v-slot:body>
        <v-data-table
          :loading="isLoading"
          hide-default-footer
          :headers="headers"
          :items="payments"
          :expanded.sync="expanded"
          item-key="orderCheckoutPaymentId"
          class="elevation-1"
          :key="tableKey"
        >
          <template v-slot:expanded-item="{ item }">
            <td></td>
            <td colspan="5" style="padding: 0">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        {{ $t("views.dashboard.fields.bankCode") }}
                      </th>
                      <th class="text-left">
                        {{ $t("views.dashboard.fields.virtualAccount") }}
                      </th>
                      <th class="text-left">
                        {{ $t("views.dashboard.fields.accountName") }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(va, index) in item.virtualAccounts"
                      :key="index"
                    >
                      <td>{{ va.bankCode }}</td>
                      <td>{{ `${va.prefix} ${va.fullVaNumber}` }}</td>
                      <td>{{ va.accountName }}</td>
                    </tr>
                    <tr v-if="item.virtualAccounts.length === 0">
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
              <td>{{ item.sequenceNo }}</td>
              <td>{{ item.amount | toCurrency }}</td>
              <td>{{ item.expiryDate }}</td>
              <td>{{ item.paymentDate }}</td>
              <td>
                <v-btn
                  v-if="item.paymentDate == null"
                  elevation="2"
                  class="mr-5"
                  @click="postBillCreation(item)"
                  small
                >
                  {{ $t("views.dashboard.createBill") }}</v-btn
                >
              </td>
            </tr>
          </template>
        </v-data-table>
      </template>
      <template v-slot:footer>
        <v-btn @click="handleClose" elevation="2" class="mr-5" small>
          {{ $t("views.dashboard.cancel") }}</v-btn
        >
      </template>
    </BasicForm>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
import BasicForm from "../layout/BasicForm";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import OrderService from "../../services/Order.service";
import { mapActions } from "pinia";
import { useErrorMessage } from "../../store/error-message";
export default {
  components: { BasicForm, LoadingDialog },
  props: ["orderCheckoutId"],
  data() {
    return {
      tableKey: 1,
      payments: [],
      isLoading: false,
      expanded: [],
      headers: [
        { text: "", value: "data-table-expand" },
        { text: "Sequence", value: "sequenceNo" },
        { text: "Amount", value: "amount" },
        { text: "Expiry date", value: "expiryDate" },
        { text: "Payment date", value: "paymentDate" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  async created() {
    await this.handleRefresh();
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    handleClose() {
      this.$emit("on:close");
    },
    onExpand(index) {
      if (!this.expanded) {
        this.expanded = [];
      }
      this.payments[index].rotate = !this.payments[index].rotate;
      const filterred = this.expanded.filter(
        (it) =>
          it.orderCheckoutPaymentId ==
          this.payments[index].orderCheckoutPaymentId
      );
      if (filterred.length > 0) {
        this.expanded = this.expanded.filter(
          (it) =>
            it.orderCheckoutPaymentId !=
            this.payments[index].orderCheckoutPaymentId
        );
      } else {
        this.expanded.push(this.payments[index]);
      }
    },
    async postBillCreation(item) {
      try {
        this.isLoading = true;
        await OrderService.postVa({
          orderCheckoutPaymentId: item.orderCheckoutPaymentId,
        });
        await this.handleRefresh();
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.pushError(error);
      }
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        this.payments = await OrderService.searchCheckoutPayments(
          this.orderCheckoutId
        );
        this.tableKey += 1;
        this.payments.map((it) => {
          return {
            ...it,
            rotate: false,
          };
        });
        this.expanded = [];
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.pushError(error);
      }
    },
  },
};
</script>
<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
