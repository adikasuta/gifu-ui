<template>
  <v-container>
    <slot name="breadcrumb"></slot>
    <ValidationObserver ref="observer">
      <form autocomplete="off">
        <BasicProductData class="mb-10" />
        <VariationViewSetting class="mb-10" />
        <VariantPricingCombination class="mb-10" />
        <ProductPricingRange class="mb-10" />
        <v-btn elevation="2" color="primary" @click="handleSubmit">
          {{ $t("views.product.save") }}</v-btn
        >
      </form>
    </ValidationObserver>

    <v-dialog v-model="isLoading" width="100" persistent>
      <LoadingDialog />
    </v-dialog>
    <v-dialog v-model="isError" width="25%" persistent>
      <ErrorDialog
        :errorDescription="errorMessage"
        @close:dialog="isError = !isError"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ProductPricingRange from "../../../components/product/ProductPricingRange";
import VariantPricingCombination from "../../../components/product/VariantPricingCombination";
import BasicProductData from "../../../components/product/BasicProductData";
import VariationViewSetting from "../../../components/product/VariationViewSetting";
import ErrorDialog from "../../../components/dialogs/ErrorDialog.vue";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import { mapActions } from "pinia";
import { useProductForm } from "../../../store/product-form";
export default {
  components: {
    ValidationObserver,
    ProductPricingRange,
    VariantPricingCombination,
    VariationViewSetting,
    BasicProductData,
    ErrorDialog,
    LoadingDialog,
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      errorMessage: "",
    };
  },
  computed: {},
  mounted(){
    this.resetForm()
  },
  methods: {
    ...mapActions(useProductForm, ["postProduct","resetForm"]),
    async handleSubmit() {
      this.$refs.observer.validate().then(async (success) => {
        if (success) {
          try {
            this.isLoading = true;
            await this.postProduct();
            this.isLoading = false;
            this.$router.push("/dashboard/product");
          } catch (error) {
            console.log(error);
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = "Unhandled Error";
            if (error.response) {
              this.errorMessage = error.response.data.message;
            }
          }
        }
      });
    },
  },
};
</script>
