import api from "./api";
const BASE_URL = '/api/timeline';
export default {
  async searchTasks() {
    return await api.get(`${BASE_URL}/tasks`);
  },
  async changeStatus(request) {
    return await api.post(`${BASE_URL}/update-status`, null, request);
  },
}