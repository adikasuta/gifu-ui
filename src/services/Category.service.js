import api from "./api";
const BASE_URL = '/api/product-category'
export default {
  async getProductCategories() {
    return await api.get(`${BASE_URL}`);
  },
  async postProductCategory(request){
    return await api.post(`${BASE_URL}`, null, request);
  },
  async putProductCategory(request){
    return await api.put(`${BASE_URL}`, null, request);
  },
  async deleteProductCategory(id){
    return await api.delete(`${BASE_URL}/${id}`);
  }
}