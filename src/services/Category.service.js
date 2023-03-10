import api from "./api";
const BASE_URL = '/api/product-category'
export default {
  async getProductCategories() {
    return await api.get(`${BASE_URL}`);
  },
}