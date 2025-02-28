// src/components/CreateAgent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AgentService from "../services/AgentService";

const CreateAgent = () => {
  const [agent, setAgent] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    dateNaissance: "",
    zoneDeTravail: "",
    statut: "EN_SERVICE", // Valeur par défaut
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent({ ...agent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Soumettre les données de l'agent
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
      <h2>Créer un Nouvel Agent</h2>
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
        <label>
          Téléphone:
          <input
            type="text"
            name="telephone"
            value={agent.telephone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Adresse:
          <input
            type="text"
            name="adresse"
            value={agent.adresse}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Date de Naissance:
          <input
            type="date"
            name="dateNaissance"
            value={agent.dateNaissance}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Zone de Travail:
          <input
            type="text"
            name="zoneDeTravail"
            value={agent.zoneDeTravail}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Statut:
          <select
            name="statut"
            value={agent.statut}
            onChange={handleChange}
            required
          >
            <option value="EN_SERVICE">En service</option>
            <option value="EN_CONGE">En congé</option>
            <option value="ABSENT">Absent</option>
          </select>
        </label>
        <br />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateAgent;
