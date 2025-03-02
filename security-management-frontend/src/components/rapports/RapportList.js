import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RapportService from "../../services/RapportService";
const RapportList = () => {
  const [rapports, setRapports] = useState([]);

  // Charger les rapports dès le montage du composant
  useEffect(() => {
    fetchRapports();
  }, []);

  // Fonction pour récupérer tous les rapports depuis l'API
  const fetchRapports = async () => {
    try {
      const response = await RapportService.getAllRapports();
      setRapports(response.data);
    } catch (error) {
      console.error(" Erreur lors du chargement des rapports :", error);
    }
  };

  // Fonction pour supprimer un rapport
  const deleteRapport = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce rapport ?")) {
      try {
        await RapportService.deleteRapport(id);
        fetchRapports(); // Rafraîchir la liste après suppression
      } catch (error) {
        console.error(" Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <div>
      <h2>Liste des Rapports d'Intervention</h2>
      
      {/* Bouton pour ajouter un rapport */}
      <Link to="/rapports/create">
        <button>Ajouter un Rapport</button>
      </Link>

      {/* Tableau des rapports */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Date Intervention</th>
            <th>Agent</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rapports.length === 0 ? (
            <tr>
              <td colSpan="7">Aucun rapport disponible.</td>
            </tr>
          ) : (
            rapports.map((rapport) => (
              <tr key={rapport.id}>
                <td>{rapport.id}</td>
                <td>{rapport.description}</td>
                <td>{rapport.dateIntervention}</td>
                <td>{rapport.agentNom}</td>
                <td>{rapport.agentEmail}</td>
                <td>{rapport.agentTelephone}</td>
                <td>
                  <Link to={`/rapports/${rapport.id}`}>Détails</Link> |{" "}
                  <Link to={`/rapports/edit/${rapport.id}`}>Modifier</Link> |{" "}
                  <button onClick={() => deleteRapport(rapport.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RapportList;
