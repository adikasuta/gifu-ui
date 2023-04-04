<template>
  <div>
    <!-- <v-row>
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="filterItems.searchQuery"
          :label="$t('views.dashboard.fields.search')"
          outlined
          clearable
          @change="handleRefresh"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          v-model="filterItems.productType"
          :items="productTypes"
          :label="$t('views.dashboard.fields.productType')"
          outlined
          clearable
          @change="handleRefresh"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select
          multiple
          v-model="filterItems.statuses"
          :items="orderStatuses"
          :label="$t('views.dashboard.fields.status')"
          outlined
          clearable
          @change="handleRefresh"
        ></v-select>
      </v-col>
    </v-row> -->
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.productName") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.quantity") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.deadline") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.assigneeName") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.stepName") }}
            </th>
            <th class="text-left">
              {{ $t("views.staffTasks.fields.statusName") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orders" :key="index">
            <td>{{ item.createdDate }}</td>
            <td>{{ item.orderCode }}</td>
            <td>{{ item.productType }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.customerName }}</td>
            <td>{{ item.quantity }} pcs</td>
            <td class="text-right">{{ item.grandTotal | toCurrency }}</td>
            <td>{{ item.deadline }}</td>
            <td>{{ item.paymentDate }}</td>
            <td>{{ item.statusText }}</td>
            <td>
              <v-btn
                v-if="item.status == 'WAITING_FOR_CONFIRMATION'"
                elevation="2"
                class="mr-5"
                small
                @click="handleConfirmOrder(item)"
              >
                {{ $t("views.dashboard.orderConfirmation") }}</v-btn
              >
            </td>
          </tr>
          <tr v-if="orders.length === 0">
            <td colspan="11">No matching records found</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-pagination color="pink lighten-1" 
      @input="handleRefresh"
      v-model="pagination.pageNumber"
      :length="pagination.totalPages"
    ></v-pagination>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import TimelineService from "../../services/Timeline.service";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useErrorMessage } from "../../store/error-message";
export default {
  components: {
    LoadingDialog,
  },
  data() {
    return {
      tasks: [],
      filterItems: {
        query: "",
        dateRanges: [],
        statuses: [],
        productType: null,
      },
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useReferenceData, ["orderStatuses", "productTypes"]),
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    async handleRefresh() {
      try {
        this.isLoading = true;
        const response = await TimelineService.searchTasks();
        this.orders = response.content;
        this.pagination.totalPages = response.totalPages;
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
