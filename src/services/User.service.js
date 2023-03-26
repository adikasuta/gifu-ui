import api from "./api";
const BASE_URL = '/api/user'
export default {
  async getUserRef() {
    return await api.get(`${BASE_URL}/ref`);
  },
  async searchUser(filter) {
    return await api.get(`${BASE_URL}`,filter);
  },
}