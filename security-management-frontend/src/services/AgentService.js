// src/services/AgentService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/agents"; 

const getAllAgents = () => {
  return axios.get(API_URL);
};

const getAgentById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createAgent = (agent) => {
  return axios.post(API_URL, agent);
};

const updateAgent = (id, agent) => {
  return axios.put(`${API_URL}/${id}`, agent);
};

const deleteAgent = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllAgents,
  getAgentById,
  createAgent,
  updateAgent,
  deleteAgent, // Ajout de la méthode de suppression
};
