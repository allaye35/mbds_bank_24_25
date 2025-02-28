// src/components/EditAgent.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AgentService from "../services/AgentService";

const EditAgent = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState({
    nom: "",
    prenom: "",
    email: "",
    // Ajoutez d'autres champs nécessaires
  });
  const navigate = useNavigate();

  useEffect(() => {
    AgentService.getAgentById(id)
      .then((response) => {
        setAgent(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails de l'agent", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent({ ...agent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AgentService.updateAgent(id, agent)
      .then(() => {
        navigate("/agents"); // Redirige vers la liste des agents après modification
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'agent", error);
      });
  };

  return (
    <div>
      <h2>Modifier l'Agent</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            name="nom"
            value={agent.nom}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Prénom:
          <input
            type="text"
            name="prenom"
            value={agent.prenom}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={agent.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditAgent;
