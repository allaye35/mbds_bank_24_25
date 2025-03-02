import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EntrepriseService from "../../services/EntrepriseService";

const EditEntreprise = () => {
  const { id } = useParams();
  const [entreprise, setEntreprise] = useState({ nom: "", adresse: "", telephone: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    EntrepriseService.getEntrepriseById(id)
      .then(response => setEntreprise(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  }, [id]);

  const handleChange = (e) => {
    setEntreprise({ ...entreprise, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    EntrepriseService.updateEntreprise(id, entreprise)
      .then(() => navigate("/entreprises"))
      .catch(error => console.error("Erreur de mise à jour", error));
  };

  return (
    <div>
      <h2>Modifier Entreprise</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom:</label>
        <input type="text" name="nom" value={entreprise.nom} onChange={handleChange} required />

        <label>Adresse:</label>
        <input type="text" name="adresse" value={entreprise.adresse} onChange={handleChange} required />

        <label>Téléphone:</label>
        <input type="text" name="telephone" value={entreprise.telephone} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={entreprise.email} onChange={handleChange} required />

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditEntreprise;
