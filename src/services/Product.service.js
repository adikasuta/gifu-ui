import api from "./api";
const BASE_URL = '/api/product'
export default {
  async searchProducts(request) {
    return await api.get(`${BASE_URL}`,request);
  },
  async postProduct(request) {
    return await api.post(`${BASE_URL}`,null,request);
  },
  async patchProductStatus(id, request) {
    return await api.patch(`${BASE_URL}/${id}/status`,null,request);
  },
}