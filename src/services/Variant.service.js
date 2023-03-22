import api from "./api";
const BASE_URL = '/api/variant'
export default {
  async getSearchVariant(filter) {
    return await api.get(`${BASE_URL}`,filter);
  },
  async getVariantById(id) {
    return await api.get(`${BASE_URL}/${id}`);
  },
  async postVariant(data) {
    return await api.post(`${BASE_URL}`,null,data);
  },
  async getVariantTypeRef() {
    return await api.get(`${BASE_URL}/ref/variant-type`);
  },
  async getContent(variantId, pagination){
    return await api.get(`${BASE_URL}/${variantId}/content`,pagination);
  },
  async postContent(variantId, formData){
    return await api.post(`${BASE_URL}/${variantId}/content`,null,formData);
  },
  async deleteContent(variantId, contentId){
    return await api.delete(`${BASE_URL}/${variantId}/content/${contentId}`);
  },
  async deleteVariant(variantId){
    return await api.delete(`${BASE_URL}/${variantId}`);
  }
}