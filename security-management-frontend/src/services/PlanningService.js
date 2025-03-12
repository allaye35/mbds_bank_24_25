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

  async getPlanningsByAgent(agentId) {
    if (!agentId) throw new Error("L'ID de l'agent est requis.");
    
    try {
      const response = await axios.get(`${API_URL}/agents/${agentId}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erreur lors du filtrage par agent:", error);
      throw error;
    }
  }

  async getPlanningsByMission(missionId) {
    if (!missionId) throw new Error("L'ID de la mission est requis.");
    
    try {
      const response = await axios.get(`${API_URL}/missions/${missionId}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erreur lors du filtrage par mission:", error);
      throw error;
    }
  }

  async getPlanningsByDateRange(dateDebut, dateFin) {
    if (!dateDebut || !dateFin) throw new Error("Les dates de début et de fin sont requises.");
    
    try {
      const formattedDateDebut = `${dateDebut}T00:00:00`;
      const formattedDateFin = `${dateFin}T23:59:59`;

      const response = await axios.get(`${API_URL}/rechercher`, {
        params: { dateDebut: formattedDateDebut, dateFin: formattedDateFin },
      });

      return response.data;
    } catch (error) {
      console.error("❌ Erreur lors du filtrage par période:", error);
      throw error;
    }
  }
}

export default new PlanningService();
