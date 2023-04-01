import api from "./api";
const BASE_URL = '/public/api/order'
export default {
  async postOrder(request) {
    return await api.post(`${BASE_URL}`, null, request);
  },
}