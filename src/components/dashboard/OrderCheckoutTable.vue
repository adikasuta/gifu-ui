<template>
  <div>
    <v-row>
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
      <v-col cols="12" sm="3">
        <DateComponent
          v-model="filterItems.dateRanges"
          :label="$t('views.dashboard.fields.createDate')"
          @change="handleRefresh"
          :clearable="true"
          :range="true"
        />
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              {{ $t("views.dashboard.fields.createDate") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.customerName") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.customerPhoneNo") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.customerEmail") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.orders") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.grandTotal") }}
            </th>
            <th class="text-right">
              {{ $t("views.dashboard.fields.payments") }}
            </th>
            <th class="text-right">
              {{ $t("views.dashboard.fields.paymentTerm") }}
            </th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orders" :key="index">
            <td>{{ item.createdDate }}</td>
            <td>{{ item.customerName }}</td>
            <td>{{ item.customerPhoneNo }}</td>
            <td>{{ item.customerEmail }}</td>
            <td>
              <span
                v-for="(order, indexOrder) in item.orders"
                :key="indexOrder"
              >
                {{
                  `${order.orderCode} - ${order.productName}; Status=${order.orderStatus};GrandTotal`
                }}{{ order.grandTotal | toCurrency }}
                <br />
              </span>
            </td>
            <td class="text-right">
              {{ item.grandTotalCheckout | toCurrency }}
            </td>
            <td>
              <span
                v-for="(payment, indexPayment) in item.payments"
                :key="indexPayment"
              >
                {{ `${payment.sequenceNo}.` }}{{ payment.amount | toCurrency
                }}{{ payment.paid ? payment.paymentDate : "" }}
                <br />
              </span>
            </td>
            <td>{{ item.paymentTerm }}</td>
            <td>
              <v-btn @click="handleShowDetailPopup(item)" elevation="2" class="mr-5" color="primary">
                {{ $t("views.dashboard.detailpayment") }}</v-btn
              >
            </td>
          </tr>
          <tr v-if="orders.length === 0">
            <td colspan="9">No matching records found</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-pagination
          @input="handleRefresh"
      v-model="pagination.pageNumber"
      :length="pagination.totalPages"
    ></v-pagination>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <v-dialog v-model="showCheckoutDetail" width="80%" persistent>
      <OrderCheckoutDetail
        v-if="showCheckoutDetail"
        :orderCheckoutId="selectedOrderCheckoutId"
        @on:close="toggleShowCheckoutDetail"
      />
    </v-dialog>
  </div>
</template>

<script>
import OrderCheckoutDetail from "./OrderCheckoutDetail";
import DateComponent from "../common/DateComponent";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import OrderService from "../../services/Order.service";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useErrorMessage } from "../../store/error-message";
export default {
  components: {
    OrderCheckoutDetail,
    DateComponent,
    LoadingDialog,
  },
  data() {
    return {
      selectedOrderCheckoutId: null,
      showCheckoutDetail: false,
      filterItems: {
        query: "",
        dateRanges: [],
        statuses: [],
        productType: null,
      },
      orders: [],
      pagination: {
        pageNumber: 1,
        totalPages: 0,
        pageSize: 20,
      },
      isLoading: false,
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
    toggleShowCheckoutDetail(){
      this.showCheckoutDetail = !this.showCheckoutDetail;
    },
    handleShowDetailPopup(item){
      this.selectedOrderCheckoutId = item.orderCheckoutId;
      this.showCheckoutDetail = true;
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        let filter = {
          ...this.filterItems,
        };
        filter.statuses = this.filterItems.statuses.toString();
        if (this.filterItems.dateRanges.length >= 1) {
          filter.periodFrom = this.filterItems.dateRanges[0];
        }
        if (this.filterItems.dateRanges.length >= 2) {
          filter.periodUntil = this.filterItems.dateRanges[1];
        }
        filter.dateRanges = undefined;
        const response = await OrderService.searchCheckouts({
          ...filter,
          ...this.pagination,
        });
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
