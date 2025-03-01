import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MissionService from "../services/MissionService"; // Assurez-vous d'avoir ce service configuré

const CreateMission = () => {
  const [mission, setMission] = useState({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    statutMission: "",
    siteId: "", // ID du site
    planningId: "", // ID du planning
    entrepriseId: "", // ID de l'entreprise
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMission({ ...mission, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    MissionService.createMission(mission)
      .then(() => {
        navigate("/missions"); // Redirige vers la liste des missions après création
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la mission", error);
      });
  };

  return (
    <div>
      <h2>Créer une Mission</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre:</label>
        <input
          type="text"
          name="titre"
          value={mission.titre}
          onChange={handleChange}
          required
        />
        <br />
        <label>Description:</label>
        <textarea
          name="description"
          value={mission.description}
          onChange={handleChange}
          required
        />
        <br />
        <label>Date de début:</label>
        <input
          type="date"
          name="dateDebut"
          value={mission.dateDebut}
          onChange={handleChange}
          required
        />
        <br />
        <label>Date de fin:</label>
        <input
          type="date"
          name="dateFin"
          value={mission.dateFin}
          onChange={handleChange}
          required
        />
        <br />
        <label>Statut:</label>
        <select
          name="statutMission"
          value={mission.statutMission}
          onChange={handleChange}
        >
          <option value="EN_COURS">En Cours</option>
          <option value="TERMINEE">Terminée</option>
          <option value="EN_ATTENTE">En Attente</option>
        </select>
        <br />
        <label>Site:</label>
        <input
          type="text"
          name="siteId"
          value={mission.siteId}
          onChange={handleChange}
          required
        />
        <br />
        <label>Planning:</label>
        <input
          type="text"
          name="planningId"
          value={mission.planningId}
          onChange={handleChange}
          required
        />
        <br />
        <label>Entreprise:</label>
        <input
          type="text"
          name="entrepriseId"
          value={mission.entrepriseId}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Créer Mission</button>
      </form>
    </div>
  );
};

export default CreateMission;
