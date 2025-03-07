// src/services/MissionService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/missions";

// Récupérer toutes les missions
const getAllMissions = () => axios.get(API_URL);

// Récupérer une mission par ID
const getMissionById = (id) => axios.get(`${API_URL}/${id}`);

// Créer une mission
const createMission = (missionData) => axios.post(API_URL, missionData);

// Mettre à jour une mission (champs simples)
const updateMission = (id, missionData) => axios.put(`${API_URL}/${id}`, missionData);

// Supprimer une mission
const deleteMission = (id) => axios.delete(`${API_URL}/${id}`);

// Affecter des agents
const assignAgents = (missionId, agentIds) => axios.put(`${API_URL}/${missionId}/agents`, agentIds);

// Affecter un site
const assignSite = (missionId, siteId) => axios.put(`${API_URL}/${missionId}/site/${siteId}`);

// Affecter un planning
const assignPlanning = (missionId, planningId) => axios.put(`${API_URL}/${missionId}/planning/${planningId}`);

// Affecter une entreprise
const assignEntreprise = (missionId, entrepriseId) => axios.put(`${API_URL}/${missionId}/entreprise/${entrepriseId}`);

// Affecter une géolocalisation
const assignGeolocalisation = (missionId, geoId) =>
  axios.put(`${API_URL}/${missionId}/geolocalisation/${geoId}`);

export default {
  getAllMissions,
  getMissionById,
  createMission,
  updateMission,
  deleteMission,
  assignAgents,
  assignSite,
  assignPlanning,
  assignEntreprise,
  assignGeolocalisation,
};
