import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlanningService from "../../services/PlanningService";

const EditPlanning = () => {
  const { id } = useParams();
  const [planning, setPlanning] = useState({ date: "" });
  const navigate = useNavigate();

  useEffect(() => {
    PlanningService.getPlanningById(id)
      .then(response => setPlanning(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  }, [id]);

  const handleChange = (e) => {
    setPlanning({ ...planning, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PlanningService.updatePlanning(id, planning)
      .then(() => navigate("/plannings"))
      .catch(error => console.error("Erreur de mise à jour", error));
  };

  return (
    <div>
      <h2>Modifier Planning</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={planning.date} onChange={handleChange} required />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditPlanning;
