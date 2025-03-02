import axios from "axios";

const API_URL = "http://localhost:8080/api/rapports";

const getAllRapports = () => axios.get(API_URL);
const getRapportById = (id) => axios.get(`${API_URL}/${id}`);
const createRapport = (data) => axios.post(API_URL, data);
const updateRapport = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteRapport = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getAllRapports,
  getRapportById,
  createRapport,
  updateRapport,
  deleteRapport
};
