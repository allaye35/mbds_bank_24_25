import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SiteService from "../../services/SiteService";

const EditSite = () => {
  const { id } = useParams();
  const [site, setSite] = useState({ nom: "", adresse: "" });
  const navigate = useNavigate();

  useEffect(() => {
    SiteService.getSiteById(id)
      .then(response => setSite(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  }, [id]);

  const handleChange = (e) => {
    setSite({ ...site, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SiteService.updateSite(id, site)
      .then(() => navigate("/sites"))
      .catch(error => console.error("Erreur de mise à jour", error));
  };

  return (
    <div>
      <h2>Modifier Site</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom:</label>
        <input type="text" name="nom" value={site.nom} onChange={handleChange} required />
        <br />
        <label>Adresse:</label>
        <input type="text" name="adresse" value={site.adresse} onChange={handleChange} required />
        <br />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditSite;
