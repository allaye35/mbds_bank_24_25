import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlanningService from "../../services/PlanningService";
import MissionService from "../../services/MissionService";

const EditPlanning = () => {
  const { id } = useParams();
  const [planning, setPlanning] = useState({ date: "", missions: [] });
  const [missions, setMissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger le planning actuel et toutes les missions disponibles
    const fetchData = async () => {
      try {
        const planningRes = await PlanningService.getPlanningById(id);
        setPlanning(planningRes.data);

        const missionsRes = await MissionService.getAllMissions();
        setMissions(missionsRes.data);
      } catch (error) {
        console.error("Erreur de chargement des données", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setPlanning({ ...planning, [e.target.name]: e.target.value });
  };

  const handleMissionChange = (missionId) => {
    setPlanning((prev) => ({
      ...prev,
      missions: prev.missions.some((m) => m.id === missionId)
        ? prev.missions.filter((m) => m.id !== missionId)
        : [...prev.missions, { id: missionId }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PlanningService.updatePlanning(id, planning)
      .then(() => navigate("/plannings"))
      .catch((error) => console.error("Erreur de mise à jour", error));
  };

  return (
    <div>
      <h2>Modifier Planning</h2>
      <form onSubmit={handleSubmit}>
        <label>Date :</label>
        <input
          type="date"
          name="date"
          value={planning.date}
          onChange={handleChange}
          required
        />

        <h3>Missions associées :</h3>
        <div>
          {missions.map((mission) => (
            <div key={mission.id}>
              <input
                type="checkbox"
                checked={planning.missions.some((m) => m.id === mission.id)}
                onChange={() => handleMissionChange(mission.id)}
              />
              <label>{mission.description || `Mission ${mission.id}`}</label>
            </div>
          ))}
        </div>

        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditPlanning;
