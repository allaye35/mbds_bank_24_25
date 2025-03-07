// src/components/missions/CreateMission.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MissionService from "../../services/MissionService";

const CreateMission = () => {
  const navigate = useNavigate();

  // État local de la mission
  const [mission, setMission] = useState({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    statutMission: "PLANIFIEE"
  });

  // États pour le feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Gestion des changements des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMission((prevState) => ({ ...prevState, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Vérification minimale
    if (!mission.titre || !mission.description || !mission.dateDebut || !mission.dateFin) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await MissionService.createMission(mission);
      const createdMission = response.data;
      console.log("✅ Mission créée avec succès :", createdMission);
      // Redirection vers la liste ou vers l'écran d'affectation (selon vos besoins)
      navigate("/missions");
      // OU pour rediriger vers l'affectation : navigate(`/missions/${createdMission.id}/assign`);
    } catch (error) {
      console.error("❌ Erreur lors de la création de la mission :", error);
      setErrorMessage("Erreur lors de la création de la mission.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Créer une nouvelle mission (sans affectations)</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Titre :</label>
        <input
          type="text"
          name="titre"
          value={mission.titre}
          onChange={handleChange}
          required
        />
        <br />
        <label>Description :</label>
        <textarea
          name="description"
          value={mission.description}
          onChange={handleChange}
          required
        />
        <br />
        <label>Date de début :</label>
        <input
          type="date"
          name="dateDebut"
          value={mission.dateDebut}
          onChange={handleChange}
          required
        />
        <br />
        <label>Date de fin :</label>
        <input
          type="date"
          name="dateFin"
          value={mission.dateFin}
          onChange={handleChange}
          required
        />
        <br />
        <label>Statut :</label>
        <select
          name="statutMission"
          value={mission.statutMission}
          onChange={handleChange}
        >
          <option value="PLANIFIEE">Planifiée</option>
          <option value="EN_COURS">En Cours</option>
          <option value="TERMINEE">Terminée</option>
          <option value="ANNULEE">Annulée</option>
        </select>
        <br /><br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Création en cours..." : "Créer la Mission"}
        </button>
      </form>
    </div>
  );
};

export default CreateMission;
