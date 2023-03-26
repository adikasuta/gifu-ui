import api from "./api";
const BASE_URL = '/api/ref'
export default {
  async getProductType() {
    return await api.get(`${BASE_URL}/product-type`);
  },
  async getVariantType(){
    return await api.get(`${BASE_URL}/variant-type`);
  },
  async getRoles(){
    return await api.get(`${BASE_URL}/roles`);
  }
}