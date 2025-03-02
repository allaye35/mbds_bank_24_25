import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RapportService from "../../services/RapportService";

const CreateRapport = () => {
  const [rapport, setRapport] = useState({
    dateIntervention: "",
    description: "",
    agentNom: "",
    agentEmail: "",
    agentTelephone: "",
    contenu: "",
    missionId: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRapport({ ...rapport, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RapportService.createRapport(rapport);
      alert(" Rapport créé avec succès !");
      navigate("/rapports");
    } catch (error) {
      console.error(" Erreur lors de la création du rapport :", error);
    }
  };

  return (
    <div>
      <h2>Créer un Rapport</h2>
      <form onSubmit={handleSubmit}>
        <label>Description:</label>
        <input type="text" name="description" value={rapport.description} onChange={handleChange} required />

        <label>Date d'Intervention:</label>
        <input type="date" name="dateIntervention" value={rapport.dateIntervention} onChange={handleChange} required />

        <label>Nom de l'Agent:</label>
        <input type="text" name="agentNom" value={rapport.agentNom} onChange={handleChange} required />

        <label>Email de l'Agent:</label>
        <input type="email" name="agentEmail" value={rapport.agentEmail} onChange={handleChange} required />

        <label>Téléphone de l'Agent:</label>
        <input type="text" name="agentTelephone" value={rapport.agentTelephone} onChange={handleChange} required />

        <label>Contenu:</label>
        <textarea name="contenu" value={rapport.contenu} onChange={handleChange} required />

        <label>ID Mission:</label>
        <input type="text" name="missionId" value={rapport.missionId} onChange={handleChange} required />

        <button type="submit">Créer Rapport</button>
      </form>
    </div>
  );
};

export default CreateRapport;
