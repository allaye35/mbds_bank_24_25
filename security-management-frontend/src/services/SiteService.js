import axios from "axios";

const API_URL = "http://localhost:8080/sites";

const getAllSites = () => axios.get(API_URL);
const getSiteById = (id) => axios.get(`${API_URL}/${id}`);
const createSite = (site) => axios.post(API_URL, site);
const updateSite = (id, site) => axios.put(`${API_URL}/${id}`, site);
const deleteSite = (id) => axios.delete(`${API_URL}/${id}`);

const SiteService = {
  getAllSites,
  getSiteById,
  createSite,
  updateSite,
  deleteSite,
};

export default SiteService;
