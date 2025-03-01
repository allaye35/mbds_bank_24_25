import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MissionService from "../../services/MissionService"; // Assurez-vous que le chemin est correct

const MissionDetail = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);

  useEffect(() => {
    MissionService.getMissionById(id)
      .then((response) => {
        setMission(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails de la mission", error);
      });
  }, [id]);

  if (!mission) {
    return <h3>Chargement des détails de la mission...</h3>;
  }

  return (
    <div>
      <h2>Détails de la Mission</h2>
      <p><strong>Titre :</strong> {mission.titre}</p>
      <p><strong>Description :</strong> {mission.description}</p>
      <p><strong>Date de début :</strong> {mission.dateDebut}</p>
      <p><strong>Date de fin :</strong> {mission.dateFin}</p>
      <p><strong>Statut :</strong> {mission.statutMission}</p>
      <p><strong>Site :</strong> {mission.siteId}</p>
      <p><strong>Planning :</strong> {mission.planningId}</p>
      <p><strong>Entreprise :</strong> {mission.entrepriseId}</p>

      <button onClick={() => navigate("/missions")} style={{ marginTop: "10px" }}>
        Retour à la liste
      </button>
    </div>
  );
};

export default MissionDetail;
