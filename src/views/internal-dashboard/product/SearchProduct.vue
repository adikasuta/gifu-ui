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
              v-if="hasPermission('product_add')"
              elevation="2"
              class="mr-5"
              small
              link
              href="#/dashboard/product/add"
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
              :items="publicCategories"
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
                  {{ $t("views.product.fields.available") }}
                </th>
                <th class="text-left"></th>
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
                    {{ getRanges(pricing) }} <br />
                  </span>
                </td>
                <td>
                  <span
                    v-for="(pricing, indexPricing) in item.pricingRanges"
                    :key="indexPricing"
                  >
                    {{ pricing.price | toCurrency }} <br />
                  </span>
                </td>
                <td>
                  <v-switch
                    style="margin: 0"
                    hide-details
                    color="pink lighten-1"
                    v-model="item.available"
                    @change="(e) => handleChange(e, item)"
                  ></v-switch>
                </td>
                <td>
                  <v-btn
                    v-if="hasPermission('product_edit')"
                    elevation="2"
                    class="mr-5"
                    small
                    link
                    :href="`#/dashboard/product/${item.id}`"
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
          color="pink lighten-1"
          @input="handleRefresh"
          v-model="pagination.pageNumber"
          :length="pagination.totalPages"
        ></v-pagination>
      </template>
    </BasicForm>
    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <ConfirmationDialog ref="confirmationDialog" />
  </v-container>
</template>

<script>
import SessionUtils from "../../../utils/SessionUtils";
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import BasicForm from "../../../components/layout/BasicForm";
import ProductService from "../../../services/Product.service";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../../store/reference-data";
import { useErrorMessage } from "../../../store/error-message";
export default {
  components: {
    BasicForm,
    ConfirmationDialog,
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
    };
  },
  async created() {
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useReferenceData, ["publicCategories", "productTypes"]),
  },
  methods: {
    ...SessionUtils,
    ...mapActions(useErrorMessage, ["pushError"]),
    getRanges(pricing) {
      if (!pricing.qtyMax) {
        return `> ${pricing.qtyMin}`;
      }
      return `${pricing.qtyMin} - ${pricing.qtyMax}`;
    },
    async handleChange(newValue, item) {
      try {
        this.isLoading = true;
        await ProductService.patchProductStatus(item.id, {
          available: newValue,
        });
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
    async handleRefresh() {
      try {
        this.isLoading = true;
        const response = await ProductService.searchProducts({
          ...this.filterItems,
          page: this.pagination.pageNumber - 1,
          pageSize: this.pagination.pageSize,
        });
        this.products = response.content;
        this.pagination.totalPages = response.totalPages;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.pushError(error);
      }
    },
  },
};
</script>
