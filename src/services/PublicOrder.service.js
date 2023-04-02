import api from "./api";
import Cookies from 'js-cookie';
const BASE_URL = '/public/api/order'
export default {
  async postOrder(request) {
    return await api.post(`${BASE_URL}`, null, request);
  },
  async getInvoice(orderCode) {
    return await api.get(`${BASE_URL}/${orderCode}/invoice`);
  },
  async addToCart(orderCode) {
    return await api.post(`${BASE_URL}/${orderCode}`, null, null);
  },
  async getCart() {
    const clientData = Cookies.get('client_gifu');
    return await api.get(`${BASE_URL}/cart`, null, {
      client_gifu: clientData
    });
  },
  async postCheckout(request) {
    const clientData = Cookies.get('client_gifu');
    return await api.post(`${BASE_URL}/checkout`, null, request, {
      client_gifu: clientData
    });
  }
}