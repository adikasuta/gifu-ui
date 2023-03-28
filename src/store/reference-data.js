import { defineStore } from "pinia";
import CategoryService from "../services/Category.service";
import UserService from "../services/User.service";
import ReferenceService from "../services/Reference.service";

export const useReferenceData = defineStore('ReferenceData', {
  state: () => ({
    productTypes:[],
    variantTypes:[],
    variants:[],
    roles:[],
    categories:[],
    provinces:[],
    cities:[],
    districts:[],
    kelurahans:[],
    shippingVendors:[],
    users:[]
  }),
  getters: {
    
  },
  actions: {
    async loadReferenceData() {
      this.variants = await ReferenceService.getAllVariant();
      this.productTypes = await ReferenceService.getProductType();
      this.categories = await CategoryService.getProductCategories();
      this.users = await UserService.getUserRef();
      this.variantTypes = await ReferenceService.getVariantType();
      this.roles = await ReferenceService.getRoles();
    },
    getVariantNames(variantIds){
      let names = []
      for(const variant of this.variants){
        if(variantIds.includes(variant.value)){
          names.push(variant.text)
        }
      }
      return names;
    }
  }
})