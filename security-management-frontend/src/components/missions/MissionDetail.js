import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MissionService from "../../services/MissionService";

const MissionDetail = () => {
  const { id } = useParams();
  const [mission, setMission] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMission();
  }, [id]);

  const fetchMission = () => {
    MissionService.getMissionById(id)
      .then((response) => setMission(response.data))
      .catch(() => setError("Impossible de charger la mission."));
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!mission) return <p>Chargement...</p>;

  return (
    <div>
      <h2>📄 Détails de la Mission {mission.id}</h2>
      <p><strong>Titre :</strong> {mission.titre}</p>
      <p><strong>Description :</strong> {mission.description}</p>
      <p><strong>📅 Horaire :</strong> {mission.dateDebut} - {mission.dateFin}</p>
      <p><strong>Statut :</strong> {mission.statutMission}</p>

      <h3>👮 Agents assignés</h3>
      {mission.agents.length > 0 ? (
        <ul>
          {mission.agents.map((agent) => (
            <li key={agent.id}>
              {agent.nom} {agent.prenom} - 📧 {agent.email}
              <Link to={`/agents/${agent.id}`}>👀 Voir Profil</Link>
            </li>
          ))}
        </ul>
      ) : <p>🚫 Aucun agent affecté</p>}

      <Link to="/missions">⬅ Retour aux missions</Link>
    </div>
  );
};

export default MissionDetail;
