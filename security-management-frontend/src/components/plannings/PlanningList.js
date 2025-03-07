import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlanningService from "../../services/PlanningService";
import MissionService from "../../services/MissionService";

const PlanningList = () => {
  const [plannings, setPlannings] = useState([]);
  const [missions, setMissions] = useState([]);
  const [selectedMissions, setSelectedMissions] = useState({});

  useEffect(() => {
    fetchPlannings();
    fetchMissions();
  }, []);

  const fetchPlannings = () => {
    PlanningService.getAllPlannings()
      .then((response) => setPlannings(response.data))
      .catch((error) => console.error("❌ Erreur de chargement des plannings", error));
  };

  const fetchMissions = () => {
    MissionService.getAllMissions()
      .then((response) => setMissions(response.data))
      .catch((error) => console.error("❌ Erreur de chargement des missions", error));
  };

  const deletePlanning = (id) => {
    if (window.confirm("❌ Voulez-vous vraiment supprimer ce planning ?")) {
      PlanningService.deletePlanning(id)
        .then(() => fetchPlannings())
        .catch((error) => console.error("❌ Erreur de suppression", error));
    }
  };

  const addMissionToPlanning = (planningId) => {
    const selectedMissionId = selectedMissions[planningId];
    
    if (!selectedMissionId) return alert("⚠ Sélectionnez une mission à ajouter !");
    
    console.log(`🔄 Envoi de la requête : Ajouter Mission ${selectedMissionId} à Planning ${planningId}`);

    PlanningService.addMissionToPlanning(planningId, selectedMissionId)
      .then(() => {
        fetchPlannings();
        setSelectedMissions({ ...selectedMissions, [planningId]: "" }); // Réinitialise la sélection
        console.log("✅ Mission ajoutée avec succès !");
      })
      .catch((error) => console.error("❌ Erreur d'ajout de mission", error));
  };

  return (
    <div>
      <h2>📅 Liste des Plannings</h2>
      <Link to="/plannings/create">
        <button>➕ Ajouter un Planning</button>
      </Link>

      <table border="1" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date Création</th>
            <th>Dernière Modification</th>
            <th>Agents Affectés</th>
            <th>Missions Associées</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plannings.map((planning) => (
            <tr key={planning.id}>
              <td>{planning.id}</td>
              <td>{new Date(planning.dateCreation).toLocaleString()}</td>
              <td>{new Date(planning.dateModification).toLocaleString()}</td>

              {/* 🔹 Afficher les AGENTS à partir des MISSIONS du planning */}
              <td>
                {planning.missions && planning.missions.length > 0 ? (
                  <ul>
                    {planning.missions.flatMap(mission =>
                      mission.agents.map(agent => (
                        <li key={agent.id}>
                          {agent.nom} {agent.prenom} ({agent.email})
                        </li>
                      ))
                    )}
                  </ul>
                ) : (
                  <span>🚫 Aucun agent</span>
                )}
              </td>

              {/* 🔹 Liste des missions */}
              <td>
                {planning.missions && planning.missions.length > 0 ? (
                  <ul>
                    {planning.missions.map((mission) => (
                      <li key={mission.id}>
                        {mission.titre} ({mission.dateDebut} - {mission.dateFin})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>🚫 Aucune mission</span>
                )}
              </td>

              {/* 🔹 Actions */}
              <td>
                <Link to={`/plannings/${planning.id}`}>🔍 Détails</Link> |
                <Link to={`/plannings/edit/${planning.id}`}>✏ Modifier</Link> |
                <button onClick={() => deletePlanning(planning.id)}>🗑 Supprimer</button>

                {/* 🔹 Ajouter une mission */}
                <div style={{ marginTop: "5px" }}>
                  <select 
                    onChange={(e) => setSelectedMissions({ ...selectedMissions, [planning.id]: e.target.value })}
                    value={selectedMissions[planning.id] || ""}
                  >
                    <option value="">Sélectionner une mission</option>
                    {missions.map((mission) => (
                      <option key={mission.id} value={mission.id}>
                        {mission.titre}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => addMissionToPlanning(planning.id)}>➕ Ajouter Mission</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanningList;
