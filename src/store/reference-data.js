import { defineStore } from "pinia";
import CategoryService from "../services/Category.service";
import UserService from "../services/User.service";
import ReferenceService from "../services/Reference.service";

export const useReferenceData = defineStore('ReferenceData', {
  state: () => ({
    productTypes: [],
    variantTypes: [],
    variants: [],
    roles: [],
    categories: [],
    publicCategories: [],
    provinces: [],
    cities: [],
    districts: [],
    kelurahans: [],
    shippingVendors: [],
    users: [],
    orderStatuses: [],
    genders: [],
    pricingRangeFilters: [],
  }),
  getters: {

  },
  actions: {
    resetCities() {
      this.cities = [];
    },
    resetKelurahan() {
      this.kelurahans = [];
    },
    resetDistricts() {
      this.districts = [];
    },
    async loadCities(provinceId) {
      this.cities = await ReferenceService.getCities(provinceId);
    },
    async loadDistricts(cityId) {
      this.districts = await ReferenceService.getDistricts(cityId);
    },
    async loadKelurahan(districtId) {
      this.kelurahans = await ReferenceService.getKelurahans(districtId);
    },
    async loadReferenceData() {
      this.pricingRangeFilters = await ReferenceService.getPricingRangeFilter();
      const gendersRef = await ReferenceService.getGender();
      this.genders = gendersRef.map(it=>{
        return {
          value: parseInt(it.value),
          text: it.text
        }
      });
      this.orderStatuses = await ReferenceService.getOrderStatus();
      this.shippingVendors = await ReferenceService.getShippingVendors();
      this.variants = await ReferenceService.getAllVariant();
      this.productTypes = await ReferenceService.getProductType();
      this.variantTypes = await ReferenceService.getVariantType();
      this.roles = await ReferenceService.getRoles();
      this.provinces = await ReferenceService.getProvinces();
      this.publicCategories = await ReferenceService.getProductCategories();
      this.categories = await CategoryService.getProductCategories();
      this.users = await UserService.getUserRef();
    },
    getVariantNames(variantIds) {
      let names = []
      for (const variant of this.variants) {
        if (variantIds.includes(variant.value)) {
          names.push(variant.text)
        }
      }
      return names;
    }
  }
})