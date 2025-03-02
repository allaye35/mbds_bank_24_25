import React, { useState, useEffect } from "react";
import MissionService from "../../services/MissionService";
import { useNavigate } from "react-router-dom";

const MissionList = () => {
  const [missions, setMissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
      <button onClick={() => navigate("/missions/create")}>Créer une Mission</button>
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
                <button onClick={() => navigate(`/missions/edit/${mission.id}`)}>Modifier</button>
                <button
                  onClick={() => {
                    if (window.confirm("Voulez-vous vraiment supprimer cette mission ?")) {
                      MissionService.deleteMission(mission.id).then(() => {
                        setMissions(missions.filter((m) => m.id !== mission.id));
                      });
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
