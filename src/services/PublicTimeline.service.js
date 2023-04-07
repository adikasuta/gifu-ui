import api from "./api";
const BASE_URL = '/public/api/timeline';
export default {
  async trackOrders(query) {
    return await api.get(`${BASE_URL}/order-tracker`,query);
  },
}