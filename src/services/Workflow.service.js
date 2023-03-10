import api from "./api";
const WORKFLOW_BASE_URL = '/api/workflow'
export default {
  async getWorkflows(filter) {
    const {fieldName, query} = filter;
    return await api.get(`${WORKFLOW_BASE_URL}?fieldName=${fieldName}&query=${query}`);
  },
  async deleteWorkflows(id) {
    return await api.delete(`${WORKFLOW_BASE_URL}/${id}`);
  },
  async postWorkflows(request) {
    return await api.post(`${WORKFLOW_BASE_URL}`,null,request);
  },
  async putWorkflows(request) {
    return await api.put(`${WORKFLOW_BASE_URL}`,null,request);
  },
  async changeName(request) {
    return await api.put(`${WORKFLOW_BASE_URL}/name`,null,request);
  },
}