import axios from "axios";

const API_URL = "http://localhost:8080/api/entreprises"; 

const getAllEntreprises = () => axios.get(API_URL);
const getEntrepriseById = (id) => axios.get(`${API_URL}/${id}`);
const createEntreprise = (data) => axios.post(API_URL, data);
const updateEntreprise = (id, data) => axios.put(`${API_URL}/${id}`, data);
const deleteEntreprise = (id) => axios.delete(`${API_URL}/${id}`);

export default { getAllEntreprises, getEntrepriseById, createEntreprise, updateEntreprise, deleteEntreprise };
