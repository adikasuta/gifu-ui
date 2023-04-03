import api from "./api";
const BASE_URL = '/api/order'
export default {
  async searchOrders(filter) {
    return await api.get(`${BASE_URL}/dashboard`, filter);
  },

  async confirmOrder(request) {
    return await api.post(`${BASE_URL}/confirmation`, null, request);
  },
}