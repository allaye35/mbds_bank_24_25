import axios from "axios";

const API_URL = "http://localhost:8080/plannings";

class PlanningService {
  getAllPlannings() {
    return axios.get(API_URL);
  }

  getPlanningById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createPlanning(planning) {
    return axios.post(API_URL, planning);
  }

  updatePlanning(id, planning) {
    return axios.put(`${API_URL}/${id}`, planning);
  }

  deletePlanning(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  addMissionToPlanning(planningId, missionId) {
    return axios.post(`${API_URL}/${planningId}/missions/${missionId}`);
  }

  removeMissionFromPlanning(planningId, missionId) {
    return axios.delete(`${API_URL}/${planningId}/missions/${missionId}`);
  }
}

export default new PlanningService();
