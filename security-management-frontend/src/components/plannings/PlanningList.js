import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlanningService from "../../services/PlanningService";
import MissionService from "../../services/MissionService";

const PlanningList = () => {
  const [plannings, setPlannings] = useState([]);
  const [missions, setMissions] = useState([]);
  const [selectedMissions, setSelectedMissions] = useState({});
  const [filters, setFilters] = useState({ agentId: "", missionId: "", dateDebut: "", dateFin: "" });

  useEffect(() => {
    fetchPlannings();
    fetchMissions();
  }, []);

  const fetchPlannings = async () => {
    try {
      const response = await PlanningService.getAllPlannings();
      setPlannings(response.data);
    } catch (error) {
      console.error("❌ Erreur de chargement des plannings", error);
    }
  };

  const fetchMissions = async () => {
    try {
      const response = await MissionService.getAllMissions();
      setMissions(response.data);
    } catch (error) {
      console.error("❌ Erreur de chargement des missions", error);
    }
  };

  const deletePlanning = async (id) => {
    if (window.confirm("❌ Voulez-vous vraiment supprimer ce planning ?")) {
      try {
        await PlanningService.deletePlanning(id);
        fetchPlannings();
      } catch (error) {
        console.error("❌ Erreur de suppression", error);
      }
    }
  };

  const addMissionToPlanning = async (planningId) => {
    const selectedMissionId = selectedMissions[planningId];
    if (!selectedMissionId) return alert("⚠ Sélectionnez une mission à ajouter !");
    
    try {
      await PlanningService.addMissionToPlanning(planningId, selectedMissionId);
      fetchPlannings();
      setSelectedMissions({ ...selectedMissions, [planningId]: "" });
    } catch (error) {
      console.error("❌ Erreur d'ajout de mission", error);
    }
  };

  const removeMissionFromPlanning = async (planningId, missionId) => {
    if (!window.confirm("❌ Voulez-vous vraiment retirer cette mission du planning ?")) return;
    
    try {
      await PlanningService.removeMissionFromPlanning(planningId, missionId);
      fetchPlannings();
    } catch (error) {
      console.error("❌ Erreur de suppression de la mission", error);
    }
  };

  const filterPlannings = async () => {
    try {
      if (filters.agentId) {
        const data = await PlanningService.getPlanningsByAgent(filters.agentId);
        setPlannings(data);
      } else if (filters.missionId) {
        const data = await PlanningService.getPlanningsByMission(filters.missionId);
        setPlannings(data);
      } else if (filters.dateDebut && filters.dateFin) {
        if (new Date(filters.dateDebut) > new Date(filters.dateFin)) {
          alert("⚠ La date de début ne peut pas être après la date de fin !");
          return;
        }
        const data = await PlanningService.getPlanningsByDateRange(filters.dateDebut, filters.dateFin);
        setPlannings(data);
      } else {
        fetchPlannings();
      }
    } catch (error) {
      console.error("❌ Erreur lors de l'application des filtres", error);
    }
  };

  return (
    <div>
      <h2>📅 Liste des Plannings</h2>
      <Link to="/plannings/create">
        <button>➕ Ajouter un Planning</button>
      </Link>

      {/* Filtres */}
      <div style={{ margin: "20px 0" }}>
        <h3>🔍 Filtrer les Plannings</h3>
        <input type="text" placeholder="ID Agent" value={filters.agentId} onChange={(e) => setFilters({ ...filters, agentId: e.target.value })} />
        <input type="text" placeholder="ID Mission" value={filters.missionId} onChange={(e) => setFilters({ ...filters, missionId: e.target.value })} />
        <input type="date" value={filters.dateDebut} onChange={(e) => setFilters({ ...filters, dateDebut: e.target.value })} />
        <input type="date" value={filters.dateFin} onChange={(e) => setFilters({ ...filters, dateFin: e.target.value })} />
        <button onClick={filterPlannings}>🔍 Appliquer</button>
      </div>

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

              {/* Liste des agents affectés */}
              <td>
                <ul>
                  {planning.missions?.flatMap(mission =>
                    mission.agents.map(agent => (
                      <li key={`agent-${mission.id}-${agent.id}`}>
                        {agent.nom} {agent.prenom} ({agent.email})
                      </li>
                    ))
                  ) || <span>🚫 Aucun agent</span>}
                </ul>
              </td>

              {/* Liste des missions associées */}
              <td>
                <ul>
                  {planning.missions?.map(mission => (
                    <li key={`mission-${mission.id}`}>
                      {mission.titre} ({mission.dateDebut} - {mission.dateFin})
                      <button
                        onClick={() => removeMissionFromPlanning(planning.id, mission.id)}
                        style={{ marginLeft: "10px", color: "red" }}
                      >
                        ❌ Retirer
                      </button>
                    </li>
                  )) || <span>🚫 Aucune mission</span>}
                </ul>
              </td>

              {/* Actions */}
              <td>
                <Link to={`/plannings/${planning.id}`}>🔍 Détails</Link> |
                <Link to={`/plannings/edit/${planning.id}`}>✏ Modifier</Link> |
                <button onClick={() => deletePlanning(planning.id)}>🗑 Supprimer</button>

                {/* Ajouter une mission */}
                <div style={{ marginTop: "5px" }}>
                  <select
                    onChange={(e) => setSelectedMissions({ ...selectedMissions, [planning.id]: e.target.value })}
                    value={selectedMissions[planning.id] || ""}
                  >
                    <option value="">Sélectionner une mission</option>
                    {missions.map(mission => (
                      <option key={`mission-option-${mission.id}`} value={mission.id}>
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
