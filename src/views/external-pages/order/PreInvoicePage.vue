<template>
    <div>
        <v-row>
            
        </v-row>
    </div>
  </template>
  
  <script>
  import ErrorDialog from "../../../components/dialogs/ErrorDialog.vue";
  import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
  import PublicProductService from "../../../services/PublicProduct.service";
  import ProductCard from "../../../components/product/ProductCard";
  import { mapState } from "pinia";
  import { useReferenceData } from "../../../store/reference-data";
  export default {
    name: "ProductDisplay",
    components: { ProductCard, ErrorDialog, LoadingDialog },
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
        isError: false,
        errorMessage: "",
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
  
  <style scoped></style>
  