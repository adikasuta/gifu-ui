import api from "./api";
const BASE_URL = '/public/api/product'
export default {
  async searchProducts(filter) {
    return await api.get(`${BASE_URL}`, filter);
  },
  async getProductById(id) {
    return await api.get(`${BASE_URL}/${id}`);
  },
  async getVariantsByProductId(id) {
    return await api.get(`${BASE_URL}/${id}/variants`);
  },
}