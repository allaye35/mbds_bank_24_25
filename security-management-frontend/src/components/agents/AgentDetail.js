import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import AgentService from "../../services/AgentService";

const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [error, setError] = useState(null);

  const fetchAgent = useCallback(() => {
    AgentService.getAgentById(id)
      .then((response) => setAgent(response.data))
      .catch(() => setError("Impossible de charger l'agent."));
  }, [id]); // ✅ Ajoute `id` dans les dépendances de useCallback

  useEffect(() => {
    fetchAgent();
  }, [fetchAgent]); // ✅ Ajoute `fetchAgent` dans les dépendances

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!agent) return <p>Chargement...</p>;

  return (
    <div>
      <h2>👮 Profil de {agent.nom} {agent.prenom}</h2>
      <p><strong>Email :</strong> {agent.email}</p>
      <p><strong>Téléphone :</strong> {agent.telephone || "N/A"}</p>
      <p><strong>Zone de Travail :</strong> {agent.zoneDeTravail || "Non spécifiée"}</p>
      <p><strong>Statut :</strong> {agent.statut || "Inconnu"}</p>

      <h3>📋 Missions assignées</h3>
      {agent.missions && agent.missions.length > 0 ? (
        <ul>
          {agent.missions.map((mission) => (
            <li key={mission.id}>
              <strong>{mission.titre}</strong> ({mission.dateDebut} - {mission.dateFin})
              <Link to={`/missions/${mission.id}`}> 📄 Voir Détails</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>🚫 Aucune mission assignée</p>
      )}

      <Link to="/agents">⬅ Retour aux agents</Link>
    </div>
  );
};

export default AgentDetail;
