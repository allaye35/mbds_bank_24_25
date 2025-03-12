import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PlanningService from "../../services/PlanningService";

const PlanningDetail = () => {
  const { id } = useParams();
  const [planning, setPlanning] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlanning();
  }, [id]);

  const fetchPlanning = () => {
    PlanningService.getPlanningById(id)
      .then((response) => setPlanning(response.data))
      .catch(() => setError("Impossible de charger le planning."));
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!planning) return <p>Chargement...</p>;

  return (
    <div>
      <h2>📅 Détails du Planning {planning.id}</h2>
      <p><strong>Date de Création :</strong> {new Date(planning.dateCreation).toLocaleString()}</p>

      <h3>📋 Missions associées</h3>
      {planning.missions.length > 0 ? (
        <ul>
          {planning.missions.map((mission) => (
            <li key={mission.id}>
              <strong>{mission.titre}</strong> ({mission.dateDebut} - {mission.dateFin})
              <Link to={`/missions/${mission.id}`}>📄 Voir Détails</Link>
              
              {/* 🔹 Affichage des agents de cette mission */}
              {mission.agents.length > 0 ? (
                <ul>
                  {mission.agents.map((agent) => (
                    <li key={agent.id}>
                      {agent.nom} {agent.prenom} - 📧 {agent.email}
                      <Link to={`/agents/${agent.id}`}>👀 Voir Profil</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>🚫 Aucun agent affecté</p>
              )}
            </li>
          ))}
        </ul>
      ) : <p>🚫 Aucune mission associée</p>}

      <Link to="/plannings">⬅ Retour à la liste</Link>
    </div>
  );
};

export default PlanningDetail;
