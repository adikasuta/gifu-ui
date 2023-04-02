import api from "./api";
const BASE_URL = '/public/api/order'
export default {
  async postOrder(request) {
    return await api.post(`${BASE_URL}`, null, request);
  },
  async getInvoice(orderCode) {
    return await api.get(`${BASE_URL}/${orderCode}/invoice`);
  },
  async addToCart(orderCode) {
    return await api.post(`${BASE_URL}/${orderCode}`,null,null);
  },
}