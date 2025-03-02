import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlanningService from "../../services/PlanningService";

const PlanningList = () => {
  const [plannings, setPlannings] = useState([]);

  useEffect(() => {
    fetchPlannings();
  }, []);

  const fetchPlannings = () => {
    PlanningService.getAllPlannings()
      .then(response => setPlannings(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  };

  const deletePlanning = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce planning ?")) {
      PlanningService.deletePlanning(id)
        .then(() => fetchPlannings())
        .catch(error => console.error("Erreur de suppression", error));
    }
  };

  return (
    <div>
      <h2>Liste des Plannings</h2>
      <Link to="/plannings/create">
        <button>Ajouter un Planning</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plannings.map(planning => (
            <tr key={planning.id}>
              <td>{planning.id}</td>
              <td>{planning.date}</td>
              <td>
                <Link to={`/plannings/${planning.id}`}>Détails</Link> | 
                <Link to={`/plannings/edit/${planning.id}`}>Modifier</Link> | 
                <button onClick={() => deletePlanning(planning.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanningList;
