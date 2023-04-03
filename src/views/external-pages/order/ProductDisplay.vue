<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-parallax src="../../../../public/HomepageBanner.png" />
      </v-col>
    </v-row>
    <v-container>
      <v-card class="mx-auto" style="margin-top: -64px">
        <v-card-title>
          <v-row style="height: inherit">
            <v-col cols="12" md="6" sm="4" style="padding: 6px">
              <v-text-field
                solo
                :label="$t('views.product.fields.search')"
                append-icon="mdi-magnify"
                :hide-details="true"
                @change="handleRefresh"
                :clearable="true"
                v-model="filterItems.searchQuery"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" sm="4" style="padding: 6px">
              <v-select
                :label="$t('views.product.fields.productType')"
                :items="productTypes"
                solo
                :hide-details="true"
                @change="handleRefresh"
                :clearable="true"
                v-model="filterItems.productType"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3" sm="4" style="padding: 6px">
              <v-select
                :label="$t('views.product.fields.productCategory')"
                :items="publicCategories"
                solo
                :hide-details="true"
                @change="handleRefresh"
                :clearable="true"
                v-model="filterItems.productCategoryId"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4" v-for="item in products" :key="item.id">
              <ProductCard :productItem="item" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-pagination
                v-model="pagination.pageNumber"
                :length="pagination.totalPages"
                circle
              ></v-pagination>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
  </div>
</template>

<script>
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import PublicProductService from "../../../services/PublicProduct.service";
import ProductCard from "../../../components/product/ProductCard";
import { mapState, mapActions } from "pinia";
import { useReferenceData } from "../../../store/reference-data";
import { useErrorMessage } from "../../../store/error-message";
export default {
  name: "ProductDisplay",
  components: { ProductCard, LoadingDialog },
  data() {
    return {
      products: [],
      filterItems: {
        searchQuery: "",
        productType: null,
        productCategoryId: null,
      },
      pagination: {
        pageNumber: 1,
        totalPages: 0,
        pageSize: 20,
      },
      isLoading: false,
    };
  },
  watch: {
    "$route.query.productType": {
      handler: async function (productType) {
        this.filterItems.productType = productType;
        await this.handleRefresh();
      },
      deep: true,
      immediate: true,
    },
  },
  async mounted() {
    this.filterItems.productType = this.$route.query.productType;
    await this.handleRefresh();
  },
  computed: {
    ...mapState(useReferenceData, ["publicCategories", "productTypes"]),
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
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
        this.pushError(error);
      }
    },
  },
};
</script>

<style scoped></style>
