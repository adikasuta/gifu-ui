import api from "./api";
const BASE_URL = '/api/timeline';
export default {
  async searchTasks() {
    return await api.get(`${BASE_URL}`);
  },
}