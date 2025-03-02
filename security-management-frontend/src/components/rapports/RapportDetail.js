import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RapportService from "../../services/RapportService";

const RapportDetail = () => {
  const { id } = useParams();
  const [rapport, setRapport] = useState(null);

  useEffect(() => {
    RapportService.getRapportById(id)
      .then(response => {
        setRapport(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du rapport :", error);
      });
  }, [id]);

  if (!rapport) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>Détails du Rapport</h2>
      <p><strong>ID :</strong> {rapport.id}</p>
      <p><strong>Description :</strong> {rapport.description}</p>
      <p><strong>Date d'intervention :</strong> {rapport.dateIntervention}</p>
      <p><strong>Nom de l'agent :</strong> {rapport.agentNom}</p>
      <p><strong>Email de l'agent :</strong> {rapport.agentEmail}</p>
      <p><strong>Téléphone de l'agent :</strong> {rapport.agentTelephone}</p>
      <p><strong>Contenu :</strong> {rapport.contenu}</p>

      <Link to="/rapports">Retour à la liste</Link>
      <Link to={`/rapports/edit/${rapport.id}`}>Modifier</Link>
    </div>
  );
};

export default RapportDetail;
