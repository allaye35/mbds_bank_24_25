// src/components/CreateAgent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentService from "../services/AgentService";

const CreateAgent = () => {
  const [agent, setAgent] = useState({
    nom: "",
    prenom: "",
    email: "",
    // Ajoutez d'autres champs nécessaires
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent({ ...agent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AgentService.createAgent(agent)
      .then(() => {
        navigate("/agents"); // Redirige vers la liste des agents après création
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'agent", error);
      });
  };

  return (
    <div>
      <h2>Ajouter un nouvel Agent</h2>
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
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateAgent;
