import api from "./api";
const BASE_URL = '/public/api/ref'
export default {
  async getProductType() {
    return await api.get(`${BASE_URL}/product-type`);
  },
  async getVariantType() {
    return await api.get(`${BASE_URL}/variant-type`);
  },
  async getVariantByVariantTypeCode(variantTypeCode) {
    return await api.get(`${BASE_URL}/variant/${variantTypeCode}`);
  },
  async getAllVariant() {
    return await api.get(`${BASE_URL}/variant`);
  },
  async getRoles() {
    return await api.get(`${BASE_URL}/roles`);
  },
  async getProductCategories() {
    return await api.get(`${BASE_URL}/product-categories`);
  },
  async getProvinces() {
    return await api.get(`${BASE_URL}/provinces`);
  },
  async getCities(provinceId) {
    return await api.get(`${BASE_URL}/provinces/${provinceId}/cities`);
  },
  async getDistricts(cityId) {
    return await api.get(`${BASE_URL}/cities/${cityId}/districts`);
  },
  async getKelurahans(districtId) {
    return await api.get(`${BASE_URL}/districts/${districtId}/kelurahan`);
  },
  async getShippingVendors() {
    return await api.get(`${BASE_URL}/shipping-vendors`);
  },
  async getOrderStatus() {
    return await api.get(`${BASE_URL}/order-status`);
  },
  async getGender() {
    return await api.get(`${BASE_URL}/gender`);
  }
}