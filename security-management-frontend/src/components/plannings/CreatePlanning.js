import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanningService from "../../services/PlanningService";

const CreatePlanning = () => {
  const [planning, setPlanning] = useState({ date: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPlanning({ ...planning, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PlanningService.createPlanning(planning)
      .then(() => navigate("/plannings"))
      .catch(error => console.error("Erreur de création", error));
  };

  return (
    <div>
      <h2>Créer un Planning</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={planning.date} onChange={handleChange} required />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreatePlanning;
