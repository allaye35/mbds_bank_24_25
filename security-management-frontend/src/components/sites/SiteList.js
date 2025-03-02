import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SiteService from "../../services/SiteService";
const SiteList = () => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = () => {
    SiteService.getAllSites()
      .then(response => setSites(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  };

  const deleteSite = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce site ?")) {
      SiteService.deleteSite(id)
        .then(() => fetchSites())
        .catch(error => console.error("Erreur de suppression", error));
    }
  };

  return (
    <div>
      <h2>Liste des Sites</h2>
      <Link to="/sites/create">
        <button>Ajouter un Site</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sites.map(site => (
            <tr key={site.id}>
              <td>{site.id}</td>
              <td>{site.nom}</td>
              <td>{site.adresse}</td>
              <td>
                <Link to={`/sites/${site.id}`}>Détails</Link> | 
                <Link to={`/sites/edit/${site.id}`}>Modifier</Link> | 
                <button onClick={() => deleteSite(site.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SiteList;
