<template>
  <div>
    <v-container id="printArea">
      <v-row>
        <v-col class="text-left" cols="3">
          <label>{{ $t("views.invoice.orderCode") }}</label>
        </v-col>
        <v-col class="text-left" cols="9">: {{ $route.params.orderCode }}</v-col>
      </v-row>
      <v-row>
        <v-col class="text-left" cols="3">
          <label>{{ $t("views.invoice.customerName") }}</label>
        </v-col>
        <v-col class="text-left" cols="9">: {{ invoice.customerName }}</v-col>
      </v-row>
      <v-row>
        <v-col class="text-left" cols="3">
          <label>{{ $t("views.invoice.customerEmail") }}</label>
        </v-col>
        <v-col class="text-left" cols="9">: {{ invoice.customerEmail }}</v-col>
      </v-row>
      <v-row>
        <v-col class="text-left" cols="3">
          <label>{{ $t("views.invoice.customerPhone") }}</label>
        </v-col>
        <v-col class="text-left" cols="9">: {{ invoice.customerPhoneNo }}</v-col>
      </v-row>
      <v-row>
        <v-col class="text-left" cols="3">
          <label>{{ $t("views.invoice.shippingAddress") }}</label>
        </v-col>
        <v-col cols="9">: {{ fullAddress }}</v-col>
      </v-row>
      <v-divider style="margin-top:20px;margin-bottom: 5px;"></v-divider>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">{{ $t("views.invoice.productName") }}</th>
              <th class="text-left">{{ $t("views.invoice.additional") }}</th>
              <th class="text-left">{{ $t("views.invoice.quantity") }}</th>
              <th class="text-right">{{ $t("views.invoice.price") }}</th>
              <th class="text-right">{{ $t("views.invoice.totalAmount") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">{{ invoice.productName }}</td>
              <td>{{ invoice.quantity }} pcs</td>
              <td class="text-right">{{ invoice.productPrice | toCurrency }}</td>
              <td class="text-right">{{ totalProductAmount | toCurrency }}</td>
            </tr>
            <tr v-for="(variant, index) of invoice.variants" :key="index">
              <td></td>
              <td>
                {{
                  `${variant.variantTypeCode} - ${variant.variantName}: ${variant.contentName}`
                }}
              </td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td class="text-right" colspan="4">{{ $t("views.invoice.additionalCost") }}</td>
              <td class="text-right">{{ totalVariantAmount | toCurrency }}</td>
            </tr>
            <tr>
              <td class="text-right" colspan="4">{{ $t("views.invoice.subtotal") }}</td>
              <td class="text-right">{{ invoice.subTotal | toCurrency }}</td>
            </tr>
            <tr>
              <td class="text-right" colspan="4">{{ $t("views.invoice.shippingFee") }}</td>
              <td class="text-right">{{ invoice.shippingFee | toCurrency }}</td>
            </tr>
            <tr>
              <td class="text-right" colspan="4">{{ $t("views.invoice.grandTotal") }}</td>
              <td class="text-right">{{ invoice.grandTotal | toCurrency }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
    <v-divider class="mt-5 mb-5"></v-divider>
    <v-row>
      <v-col style="text-align: right" cols="12">
        <v-btn class="mr-10 mb-10" color="pink lighten-1" @click="handlePrint">
          {{ $t("views.invoice.print") }}
        </v-btn>
        <v-btn v-if="invoice.status == 'DRAFT'" class="mr-10 mb-10" color="pink lighten-1" @click="handleAddToCart">
          {{ $t("views.invoice.addToCart") }}
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <v-dialog v-model="isError" width="25%" persistent>
      <ErrorDialog
        :errorDescription="errorMessage"
        @close:dialog="isError = !isError"
      />
    </v-dialog>
  </div>
</template>

<script>
import ErrorDialog from "../../../components/dialogs/ErrorDialog.vue";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import PublicOrderService from "../../../services/PublicOrder.service";
export default {
  components: { ErrorDialog, LoadingDialog },
  data() {
    return {
      invoice: {},
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    fullAddress() {
      return `${this.invoice.address}, ${this.invoice.cityName}, ${this.invoice.provinceName} ${this.invoice.postalCode}`;
    },
    totalProductAmount() {
      return this.invoice.productPrice * this.invoice.quantity;
    },
    totalVariantAmount() {
      return this.invoice.variantPrice * this.invoice.quantity;
    },
  },
  methods: {
    async handleAddToCart() {
      try {
        this.isLoading = true;
        await PublicOrderService.addToCart(this.$route.params.orderCode);
        this.isLoading = false;
        this.$router.push(`/carts`);
      } catch (error) {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Unhandled Error";
        if (error.response) {
          this.errorMessage = error.response.data.message;
        }
      }
    },
    async handlePrint() {
      await this.$htmlToPaper("printArea");
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        this.invoice = await PublicOrderService.getInvoice(
          this.$route.params.orderCode
        );
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Unhandled Error";
        if (error.response) {
          this.errorMessage = error.response.data.message;
        }
      }
    },
  },
};
</script>

<style scoped></style>
