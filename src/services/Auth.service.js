import api from "./api";
const BASE_URL = '/api/auth'
export default {
  async login(request) {
    return await api.post(`${BASE_URL}/login`, null, request);
  },
}