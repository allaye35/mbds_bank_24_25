import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GeolocalisationService from "../../services/GeolocalisationService";

const GeolocalisationList = () => {
  const [geolocalisations, setGeolocalisations] = useState([]);

  useEffect(() => {
    fetchGeolocalisations();
  }, []);

  const fetchGeolocalisations = () => {
    GeolocalisationService.getAllGeolocalisations()
      .then(response => setGeolocalisations(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  };

  const deleteGeolocalisation = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette géolocalisation ?")) {
      GeolocalisationService.deleteGeolocalisation(id)
        .then(() => fetchGeolocalisations())
        .catch(error => console.error("Erreur de suppression", error));
    }
  };

  return (
    <div>
      <h2>Liste des Géolocalisations</h2>
      <Link to="/geolocalisations/create">
        <button>Ajouter une Géolocalisation</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Précision GPS</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {geolocalisations.map(gps => (
            <tr key={gps.id}>
              <td>{gps.id}</td>
              <td>{gps.gps_precision}</td>
              <td>{gps.position.latitude}</td>
              <td>{gps.position.longitude}</td>
              <td>
                <Link to={`/geolocalisations/${gps.id}`}>Détails</Link> | 
                <Link to={`/geolocalisations/edit/${gps.id}`}>Modifier</Link> | 
                <button onClick={() => deleteGeolocalisation(gps.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeolocalisationList;
