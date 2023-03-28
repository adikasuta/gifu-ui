import api from "./api";
const BASE_URL = '/api/product'
export default {
  async postProduct(request) {
    return await api.post(`${BASE_URL}`,null,request);
  },
}