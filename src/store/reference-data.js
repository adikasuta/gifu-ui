import { defineStore } from "pinia";
import CategoryService from "../services/Category.service";
import UserService from "../services/User.service";
import ReferenceService from "../services/Reference.service";

export const useReferenceData = defineStore('ReferenceData', {
  state: () => ({
    productTypes:[],
    variantTypes:[],
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
      this.productTypes = await ReferenceService.getProductType();
      this.categories = await CategoryService.getProductCategories();
      this.users = await UserService.getUserRef();
      this.variantTypes = await ReferenceService.getVariantType();
      this.roles = await ReferenceService.getRoles();
    }
  }
})