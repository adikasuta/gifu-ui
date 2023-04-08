import api from "./api";
const BASE_URL = '/auth/api'
export default {
  async login(request) {
    return await api.post(`${BASE_URL}/login`, null, request);
  },
  async changePassword(request) {
    return await api.post(`${BASE_URL}/change-password`, null, request);
  },
}