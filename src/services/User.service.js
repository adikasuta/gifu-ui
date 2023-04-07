import api from "./api";
const BASE_URL = '/api/user'
export default {
  async getUserRef() {
    return await api.get(`${BASE_URL}/ref`);
  },
  async searchUser(filter) {
    return await api.get(`${BASE_URL}`, filter);
  },
  async getProfile() {
    return await api.get(`${BASE_URL}/profile`);
  },
  async updateProfile(formData) {
    return await api.post(`${BASE_URL}/profile`, null, formData);
  },
  async generateProfileReferralCode() {
    return await api.post(`${BASE_URL}/profile/cs-referral`);
  },
}