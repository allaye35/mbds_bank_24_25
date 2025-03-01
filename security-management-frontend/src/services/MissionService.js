import axios from "axios";

const API_URL = "http://localhost:8080/api/missions";

const getAllMissions = () => axios.get(API_URL);
const getMissionById = (id) => axios.get(`${API_URL}/${id}`);
const createMission = (mission) => axios.post(API_URL, mission);
const updateMission = (id, mission) => axios.put(`${API_URL}/${id}`, mission);
const deleteMission = (id) => axios.delete(`${API_URL}/${id}`);

export default {
  getAllMissions,
  getMissionById,
  createMission,
  updateMission,
  deleteMission,
};
