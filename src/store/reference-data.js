import { defineStore } from "pinia";
import CategoryService from "../services/Category.service";
import UserService from "../services/User.service";

export const useReferenceData = defineStore('ReferenceData', {
  state: () => ({
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
      this.categories = await CategoryService.getProductCategories();
      this.users = await UserService.getUserRef();
    }
  }
})