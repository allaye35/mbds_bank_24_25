import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RapportService from "../../services/RapportService";

const EditRapport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rapport, setRapport] = useState({
    description: "",
    dateIntervention: "",
    agentNom: "",
    agentEmail: "",
    agentTelephone: "",
    contenu: "",
  });

  useEffect(() => {
    RapportService.getRapportById(id)
      .then(response => {
        setRapport(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du rapport :", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRapport({ ...rapport, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    RapportService.updateRapport(id, rapport)
      .then(() => {
        alert("Rapport modifié avec succès !");
        navigate("/rapports");
      })
      .catch(error => {
        console.error("Erreur lors de la modification du rapport", error);
      });
  };

  return (
    <div>
      <h2>Modifier le Rapport</h2>
      <form onSubmit={handleSubmit}>
        <label>Description:</label>
        <textarea name="description" value={rapport.description} onChange={handleChange} required />

        <label>Date d'intervention:</label>
        <input type="date" name="dateIntervention" value={rapport.dateIntervention} onChange={handleChange} required />

        <label>Nom de l'agent:</label>
        <input type="text" name="agentNom" value={rapport.agentNom} onChange={handleChange} required />

        <label>Email de l'agent:</label>
        <input type="email" name="agentEmail" value={rapport.agentEmail} onChange={handleChange} required />

        <label>Téléphone de l'agent:</label>
        <input type="text" name="agentTelephone" value={rapport.agentTelephone} onChange={handleChange} required />

        <label>Contenu:</label>
        <textarea name="contenu" value={rapport.contenu} onChange={handleChange} required />

        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default EditRapport;
