<template>
  <v-container>
    <slot name="breadcrumb"></slot>
    <BasicForm>
      <template v-slot:header>
        {{ $t("views.product.title") }}
      </template>
      <template v-slot:body>
        <v-row>
            <v-col cols="12">
                <v-btn
          elevation="2"
          class="mr-5"
          color="primary"
          link href="#/dashboard/product/add"
        >
          {{ $t("views.product.add") }}</v-btn
        >
            </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="filterItems.searchQuery"
              label="Search"
              outlined
              clearable
              @change="handleRefresh"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="filterItems.productType"
              :items="productTypes"
              :label="$t('views.product.fields.productType')"
              outlined
              @change="handleRefresh"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="filterItems.productCategoryId"
              :items="categories"
              :label="$t('views.product.fields.productCategory')"
              outlined
              @change="handleRefresh"
            ></v-select>
          </v-col>
        </v-row>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  {{ $t("views.product.fields.name") }}
                </th>
                <th class="text-left">
                  {{ $t("views.product.fields.variation") }}
                </th>
                <th class="text-left">
                  {{ $t("views.product.fields.price") }}
                </th>
                <th class="text-left">
                  {{ $t("views.product.fields.action") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in products" :key="index">
                <td>{{ item.name }}</td>
                <td>
                  <span
                    v-for="(pricing, indexPricing) in item.pricingRanges"
                    :key="indexPricing"
                  >
                    {{ getRanges(pricing) }} <br>
                  </span>
                </td>
                <td>
                  <span
                    v-for="(pricing, indexPricing) in item.pricingRanges"
                    :key="indexPricing"
                  >
                    {{ pricing.price }} <br>
                  </span>
                </td>
                <td>
                  <v-btn
                    elevation="2"
                    class="mr-5"
                    color="primary"
                    link :href="`#/dashboard/product/${item.id}`"
                  >
                    {{ $t("views.product.edit") }}</v-btn
                  >
                </td>
              </tr>
              <tr v-if="products.length === 0">
                <td colspan="5">No matching records found</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
      <template v-slot:footer>
        <v-pagination
          v-model="pagination.pageNumber"
          :length="pagination.totalPages"
        ></v-pagination>
      </template>
    </BasicForm>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <v-dialog v-model="isError" width="25%" persistent>
      <ErrorDialog
        :errorDescription="errorMessage"
        @close:dialog="isError = !isError"
      />
    </v-dialog>
    <ConfirmationDialog ref="confirmationDialog" />
  </v-container>
</template>

<script>
import ErrorDialog from "../../../components/dialogs/ErrorDialog.vue";
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import BasicForm from "../../../components/layout/BasicForm";
import PublicProductService from "../../../services/PublicProduct.service";
import { mapState } from "pinia";
import { useReferenceData } from "../../../store/reference-data";
export default {
  components: {
    BasicForm,
    ConfirmationDialog,
    ErrorDialog,
    LoadingDialog,
  },
  data() {
    return {
      filterItems: {
        searchQuery: "",
        productCategoryId: null,
        productType: null,
      },
      products: [],
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
    ...mapState(useReferenceData, ["categories", "productTypes"]),
  },
  methods: {
    getRanges(pricing){
      if(!pricing.qtyMax){
        return `> ${pricing.qtyMin}`
      }
      return `${pricing.qtyMin} - ${pricing.qtyMax}`
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        const response = await PublicProductService.searchProducts({
          ...this.filterItems,
          ...this.pagination,
        });
        this.products = response.content;
        this.pagination.totalPages = response.totalPages;
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
