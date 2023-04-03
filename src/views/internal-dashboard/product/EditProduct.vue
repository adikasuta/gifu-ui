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
  </v-container>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ProductPricingRange from "../../../components/product/ProductPricingRange";
import VariantPricingCombination from "../../../components/product/VariantPricingCombination";
import BasicProductData from "../../../components/product/BasicProductData";
import VariationViewSetting from "../../../components/product/VariationViewSetting";
import LoadingDialog from "../../../components/dialogs/LoadingDialog.vue";
import { mapActions } from "pinia";
import { useProductForm } from "../../../store/product-form";
import { useErrorMessage } from "../../../store/error-message";
export default {
  components: {
    ValidationObserver,
    ProductPricingRange,
    VariantPricingCombination,
    VariationViewSetting,
    BasicProductData,
    LoadingDialog,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {},
  async created() {
    try {
      this.isLoading = true;
      await this.loadProductForm(this.$route.params.id);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.pushError(error);
    }
  },
  methods: {
    ...mapActions(useErrorMessage, ["pushError"]),
    ...mapActions(useProductForm, ["postProduct", "loadProductForm"]),
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
            this.pushError(error);
          }
        }
      });
    },
  },
};
</script>
