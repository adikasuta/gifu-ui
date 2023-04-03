import { defineStore } from "pinia";
import ProductService from "../services/Product.service";
import PublicProductService from "../services/PublicProduct.service";

export const useProductForm = defineStore('ProductForm', {
  state: () => ({
    id: null,
    productCode: null,
    productCategoryId: null,
    productType: null,
    name: null,
    existingPicture: null,
    length: null,
    width: null,
    height: null,
    weight: null,
    minOrder: null,
    description: null,
    pricingRanges: [],
    productVariantPrices: [],
    productVariantViews: [],
    pictureFile: null,
  }),
  getters: {
    postPayload: (state) => {
      return {
        id: state.id,
        productType:state.productType,
        categoryId: state.productCategoryId,
        name: state.name,
        length: state.length,
        width: state.width,
        height: state.height,
        weight: state.weight,
        minOrder: state.minOrder,
        description: state.description,
        pricingRanges: state.pricingRanges,
        productVariantPrices: state.productVariantPrices,
        productVariantViews: state.productVariantViews,
      }
    }
  },
  actions: {
    resetForm(){
      this.$state.id = null;
      this.$state.productCode = null;
      this.$state.productCategoryId = null;
      this.$state.productType = null;
      this.$state.name = null;
      this.$state.existingPicture = null;
      this.$state.length = null;
      this.$state.width = null;
      this.$state.height = null;
      this.$state.weight = null;
      this.$state.minOrder = null;
      this.$state.description = null;
      this.$state.pricingRanges = [];
      this.$state.productVariantPrices = [];
      this.$state.productVariantViews = [];
      this.$state.pictureFile = null;
    },
    async loadProductForm(productId) {
      const res = await PublicProductService.getProductById(productId);
      this.$state.pictureFile = null;
      this.$state.id = res.id;
      this.$state.productCode = res.productCode;
      this.$state.productCategoryId = res.productCategoryId;
      this.$state.productType = res.productType;
      this.$state.name = res.name;
      this.$state.existingPicture = res.existingPicture;
      this.$state.length = res.length;
      this.$state.width = res.width;
      this.$state.height = res.height;
      this.$state.weight = res.weight;
      this.$state.minOrder = res.minOrder;
      this.$state.description = res.description;
      this.$state.pricingRanges = res.pricingRanges;
      this.$state.productVariantPrices = res.productVariantPrices.map(it=>{
        return {
          ...it,
          variantIds: it.variantIds.split(","),
        }
      });
      this.$state.productVariantViews = res.productVariantViews.map(it=>{
        let parsedRules = []
        if(it.rules.length>0){
          parsedRules = it.rules.map(rule=>{
            return {
              ...rule,
              variantIds: rule.variantIds.split(","),
            }
          })
        }
        return {
          ...it,
          rules: parsedRules,
          variantIds: it.variantIds.split(","),
        }
      });
    },
    async postProduct() {
      const formData = new FormData();
      formData.set("file", this.$state.pictureFile);
      formData.set("payload", JSON.stringify(this.postPayload));
      await ProductService.postProduct(formData);
    }
  }
})