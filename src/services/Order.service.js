import api from "./api";
const BASE_URL = '/api/order'
export default {
  async searchOrders(filter) {
    return await api.get(`${BASE_URL}/dashboard`, filter);
  },
  async searchCheckouts(filter) {
    return await api.get(`${BASE_URL}/order-checkout`, filter);
  },
  async searchCheckoutPayments(orderCheckoutId) {
    return await api.get(`${BASE_URL}/order-checkout/${orderCheckoutId}`);
  },
  async postVa(request) {
    return await api.post(`${BASE_URL}/va-bill`, null, request);
  },
  async confirmOrder(request) {
    return await api.post(`${BASE_URL}/confirmation`, null, request);
  },
}