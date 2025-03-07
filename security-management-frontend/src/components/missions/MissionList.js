// src/components/missions/MissionList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MissionService from "../../services/MissionService";

const MissionList = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    MissionService.getAllMissions()
      .then((response) => {
        console.log("📥 Missions récupérées :", response.data);
        if (Array.isArray(response.data)) {
          setMissions(response.data);
        } else {
          console.error("❌ Le backend ne renvoie pas un tableau :", response.data);
          setError("Problème avec le serveur (données invalides).");
          setMissions([]);
        }
      })
      .catch((err) => {
        console.error("❌ Erreur lors de la récupération des missions :", err);
        setError("Erreur lors de la récupération des missions.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Méthode pour supprimer une mission
  const handleDelete = (missionId) => {
    const confirmation = window.confirm("Voulez-vous vraiment supprimer cette mission ?");
    if (!confirmation) return;
    MissionService.deleteMission(missionId)
      .then(() => {
        setMissions((prevMissions) => prevMissions.filter((m) => m.id !== missionId));
        alert("✅ Mission supprimée avec succès !");
      })
      .catch((error) => {
        console.error("❌ Erreur lors de la suppression de la mission :", error);
        alert("Impossible de supprimer cette mission.");
      });
  };

  return (
    <div>
      <h2>Liste des Missions</h2>
      <button onClick={() => navigate("/missions/create")}>
        Créer une Mission
      </button>

      {loading && <p>Chargement en cours...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {missions.length > 0 ? (
            missions.map((mission) => (
              <tr key={mission.id}>
                <td>{mission.id}</td>
                <td>{mission.titre}</td>
                <td>{mission.description}</td>
                <td>{mission.statutMission}</td>
                <td>
                  <button onClick={() => navigate(`/missions/edit/${mission.id}`)}>
                    Modifier
                  </button>
                  <button onClick={() => navigate(`/missions/${mission.id}`)}>
                    Détails
                  </button>
                  <button
                    onClick={() => navigate(`/missions/${mission.id}/assign`)}
                    style={{ marginLeft: "8px" }}
                  >
                    Affecter
                  </button>
                  <button
                    onClick={() => handleDelete(mission.id)}
                    style={{ marginLeft: "8px", color: "red" }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "gray" }}>
                  Aucune mission disponible
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MissionList;
