import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EntrepriseService from "../../services/EntrepriseService";

const EntrepriseList = () => {
  const [entreprises, setEntreprises] = useState([]);

  useEffect(() => {
    fetchEntreprises();
  }, []);

  const fetchEntreprises = () => {
    EntrepriseService.getAllEntreprises()
      .then((response) => {
        let data = response.data;
        // Si la réponse n'est pas un tableau, on la convertit en tableau vide pour éviter les erreurs
        if (!Array.isArray(data)) {
          data = [];
        }
        setEntreprises(data);
      })
      .catch((error) =>
        console.error("Erreur de chargement des entreprises :", error)
      );
  };

  const deleteEntreprise = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette entreprise ?")) {
      EntrepriseService.deleteEntreprise(id)
        .then(() => fetchEntreprises())
        .catch((error) => console.error("Erreur de suppression :", error));
    }
  };

  return (
    <div>
      <h2>Liste des Entreprises</h2>
      <Link to="/entreprises/create">
        <button>Ajouter une Entreprise</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Nom</th><th>Adresse</th><th>Téléphone</th><th>Email</th><th>Missions</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entreprises.length > 0 ? (
            entreprises.map((entreprise) => (
              <tr key={entreprise.id}>
                <td>{entreprise.nom}</td>
                <td>{entreprise.adresse}</td>
                <td>{entreprise.telephone}</td>
                <td>{entreprise.email}</td>
                <td>
                  {entreprise.missions && entreprise.missions.length > 0 ? (
                    <ul>
                      {entreprise.missions.map((mission) => (
                        <li key={mission.id}>
                          {mission.titre} ({mission.dateDebut} - {mission.dateFin})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>Aucune mission</span>
                  )}
                </td>
                <td>
                  <Link to={`/entreprises/${entreprise.id}`}>Détails</Link> |{" "}
                  <Link to={`/entreprises/edit/${entreprise.id}`}>Modifier</Link> |{" "}
                  <button onClick={() => deleteEntreprise(entreprise.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucune entreprise disponible.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EntrepriseList;
