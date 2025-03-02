import axios from "axios";

const API_URL = "http://localhost:8080/api/geolocalisations";

const getAllGeolocalisations = async () => {
  return await axios.get(API_URL);
};

const getGeolocalisationById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

const createGeolocalisation = async (data) => {
  return await axios.post(API_URL, data);
};

const updateGeolocalisation = async (id, data) => {
  return await axios.put(`${API_URL}/${id}`, data);
};

const deleteGeolocalisation = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllGeolocalisations,
  getGeolocalisationById,
  createGeolocalisation,
  updateGeolocalisation,
  deleteGeolocalisation,
};
