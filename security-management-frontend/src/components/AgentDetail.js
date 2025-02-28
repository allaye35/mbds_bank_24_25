// src/components/AgentDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AgentService from "../services/AgentService";

const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    AgentService.getAgentById(id)
      .then((response) => {
        setAgent(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails de l'agent", error);
      });
  }, [id]);

  return (
    <div>
      <h2>Détails de l'Agent</h2>
      {agent ? (
        <div>
          <p><strong>Nom:</strong> {agent.nom}</p>
          <p><strong>Prénom:</strong> {agent.prenom}</p>
          <p><strong>Email:</strong> {agent.email}</p>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default AgentDetail;
