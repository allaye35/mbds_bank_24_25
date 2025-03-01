import React, { useState, useEffect } from "react";
import MissionService from "../services/MissionService"; // Service de gestion des missions

const MissionList = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    // Récupérer la liste des missions
    MissionService.getAllMissions()
      .then((response) => {
        setMissions(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des missions", error);
      });
  }, []);

  return (
    <div>
      <h2>Liste des Missions</h2>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.id}>
              <td>{mission.titre}</td>
              <td>{mission.description}</td>
              <td>{mission.statutMission}</td>
              <td>
                <button>
                  <a href={`/missions/edit/${mission.id}`}>Modifier</a>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Voulez-vous vraiment supprimer cette mission ?")) {
                      MissionService.deleteMission(mission.id);
                    }
                  }}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionList;
