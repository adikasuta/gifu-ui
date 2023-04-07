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
              {{ $t("views.dashboard.fields.orderCode") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.productType") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.productName") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.customerName") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.quantity") }}
            </th>

            <th class="text-right">
              {{ $t("views.dashboard.fields.grandTotal") }}
            </th>

            <th class="text-left">
              {{ $t("views.dashboard.fields.deadline") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.paymentDate") }}
            </th>
            <th class="text-left">
              {{ $t("views.dashboard.fields.status") }}
            </th>
            <th v-if="hasPermission('confirm_order')" class="text-left"></th>
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
                v-if="hasPermission('confirm_order') && item.status == 'WAITING_FOR_CONFIRMATION'"
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
            <td :colspan="hasPermission('confirm_order')?'11':'10'">No matching records found</td>
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
    <v-dialog v-model="isOpenConfirmOrder" persistent width="50%">
      <OrderConfirmation
        v-if="isOpenConfirmOrder"
        @close:dialog="toggleConfirmOrderDialog"
        :request-input="confirmOrderInput"
        @on:success="handleRefresh"
      />
    </v-dialog>
  </div>
</template>

<script>
import SessionUtils from "../../utils/SessionUtils";
import OrderConfirmation from "./OrderConfirmation";
import DateComponent from "../common/DateComponent";
import LoadingDialog from "../dialogs/LoadingDialog.vue";
import OrderService from "../../services/Order.service";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../store/reference-data";
import { useErrorMessage } from "../../store/error-message";
export default {
  components: {
    DateComponent,
    LoadingDialog,
    OrderConfirmation,
  },
  data() {
    return {
      confirmOrderInput: null,
      isOpenConfirmOrder: false,
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
    ...SessionUtils,
    ...mapActions(useErrorMessage, ["pushError"]),
    handleConfirmOrder(item) {
      this.confirmOrderInput = {
        orderId: item.id,
        orderCode: item.orderCode,
        provinceName: item.provinceName,
        cityName: item.cityName,
        districtName: item.districtName,
        kelurahanName: item.kelurahanName,
        postalCode: item.postalCode,
        address: item.address,
        shippingVendorName: item.shippingVendorName,
        shippingVendorCode: item.shippingVendorCode,
      };
      this.toggleConfirmOrderDialog();
    },
    toggleConfirmOrderDialog() {
      this.isOpenConfirmOrder = !this.isOpenConfirmOrder;
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
        const response = await OrderService.searchOrders({
          ...filter,
          page:this.pagination.pageNumber-1,pageSize:this.pagination.pageSize,
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
