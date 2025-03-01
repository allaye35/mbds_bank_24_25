import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MissionService from "../../services/MissionService";

const EditMission = () => {
  const { id } = useParams();
  const [mission, setMission] = useState({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    statutMission: "",
    siteId: "",
    planningId: "",
    entrepriseId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    MissionService.getMissionById(id)
      .then((response) => {
        setMission(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails de la mission", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMission({ ...mission, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    MissionService.updateMission(id, mission)
      .then(() => {
        navigate("/missions"); // Redirige vers la liste des missions après modification
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la mission", error);
      });
  };

  return (
    <div>
      <h2>Modifier la Mission</h2>
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
        <button type="submit">Mettre à jour la Mission</button>
      </form>
    </div>
  );
};

export default EditMission;
