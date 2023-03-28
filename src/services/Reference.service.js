import api from "./api";
const BASE_URL = '/public/api/ref'
export default {
  async getProductType() {
    return await api.get(`${BASE_URL}/product-type`);
  },
  async getVariantType(){
    return await api.get(`${BASE_URL}/variant-type`);
  },
  async getVariantByVariantTypeCode(variantTypeCode){
    return await api.get(`${BASE_URL}/variant/${variantTypeCode}`);
  },
  async getAllVariant(){
    return await api.get(`${BASE_URL}/variant`);
  },
  async getRoles(){
    return await api.get(`${BASE_URL}/roles`);
  }
}