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
    telephone: "",
    adresse: "",
    dateNaissance: "",
    zoneDeTravail: "",
    statut: "EN_SERVICE", // Valeur par défaut
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les détails de l'agent en fonction de l'ID
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
    // Soumettre les données mises à jour
    AgentService.updateAgent(id, agent)
      .then(() => {
        navigate("/agents"); // Rediriger vers la liste des agents après modification
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
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditAgent;
