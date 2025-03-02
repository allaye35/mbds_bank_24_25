import axios from "axios";

const API_URL = "http://localhost:8080/plannings";

const getAllPlannings = () => axios.get(API_URL);
const getPlanningById = (id) => axios.get(`${API_URL}/${id}`);
const createPlanning = (planning) => axios.post(API_URL, planning);
const updatePlanning = (id, planning) => axios.put(`${API_URL}/${id}`, planning);
const deletePlanning = (id) => axios.delete(`${API_URL}/${id}`);

const PlanningService = {
  getAllPlannings,
  getPlanningById,
  createPlanning,
  updatePlanning,
  deletePlanning,
};

export default PlanningService;
