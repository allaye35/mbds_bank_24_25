import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PlanningService from "../../services/PlanningService";

const PlanningDetail = () => {
  const { id } = useParams();
  const [planning, setPlanning] = useState(null);

  useEffect(() => {
    PlanningService.getPlanningById(id)
      .then(response => setPlanning(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  }, [id]);

  if (!planning) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Détails du Planning</h2>
      <p><strong>ID:</strong> {planning.id}</p>
      <p><strong>Date:</strong> {planning.date}</p>

      <h3>Missions associées</h3>
      {planning.missions && planning.missions.length > 0 ? (
        <ul>
          {planning.missions.map(mission => (
            <li key={mission.id}>{mission.description || `Mission ID: ${mission.id}`}</li>
          ))}
        </ul>
      ) : (
        <p>Aucune mission associée à ce planning.</p>
      )}

      <Link to="/plannings">Retour à la liste</Link>
    </div>
  );
};

export default PlanningDetail;
