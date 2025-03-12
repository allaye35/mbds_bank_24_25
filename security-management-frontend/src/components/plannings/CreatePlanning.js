import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanningService from "../../services/PlanningService";

const CreatePlanning = () => {
  const navigate = useNavigate();

  // Définition du planning avec `dateCreation`
  const [planning, setPlanning] = useState({
    dateCreation: new Date().toISOString().split("T")[0] + "T00:00:00", // Ajout de l'heure 00:00:00
  });

  // État pour afficher les erreurs
  const [errorMessage, setErrorMessage] = useState("");

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    setPlanning({ ...planning, [e.target.name]: e.target.value + "T00:00:00" }); // Ajout de l'heure au format
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!planning.dateCreation) {
      setErrorMessage("Veuillez sélectionner une date de création.");
      return;
    }

    try {
      await PlanningService.createPlanning(planning);
      alert("Planning créé avec succès !");
      navigate("/plannings"); // Redirection vers la liste des plannings
    } catch (error) {
      console.error("Erreur lors de la création du planning :", error.response);
      if (error.response) {
        setErrorMessage(`Erreur: ${error.response.data.message || "Vérifiez les données envoyées."}`);
      } else {
        setErrorMessage("Erreur inconnue, veuillez réessayer.");
      }
    }
  };

  return (
    <div>
      <h2>Créer un Nouveau Planning</h2>

      {/* Affichage des erreurs */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>Date de Création :</label>
        <input
          type="date"
          name="dateCreation"
          value={planning.dateCreation.split("T")[0]} // Affichage de la date sans heure
          onChange={handleChange}
          required
        />

        <button type="submit">Créer le Planning</button>
      </form>
    </div>
  );
};

export default CreatePlanning;
