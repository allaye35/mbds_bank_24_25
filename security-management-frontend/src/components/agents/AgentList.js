// src/components/AgentList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AgentService from "../../services/AgentService";

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    AgentService.getAllAgents()
      .then((response) => {
        setAgents(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des agents", error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet agent ?")) {
      AgentService.deleteAgent(id)
        .then(() => {
          setAgents(agents.filter(agent => agent.id !== id));
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de l'agent", error);
        });
    }
  };

  return (
    <div>
      <h2>Liste des Agents</h2>
      <Link to="/agents/create">Créer un nouvel agent</Link>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map(agent => (
            <tr key={agent.id}>
              <td>{agent.nom}</td>
              <td>{agent.prenom}</td>
              <td>{agent.email}</td>
              <td>{agent.telephone}</td>
              <td>{agent.adresse}</td>
              <td>{agent.statut}</td>
              <td>
                <Link to={`/agents/edit/${agent.id}`}>Modifier</Link>
                <button onClick={() => handleDelete(agent.id)}>Supprimer</button>
                <Link to={`/agents/${agent.id}`}>Voir Détails</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;
