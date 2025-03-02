// src/components/geolocalisations/GeolocalisationDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GeolocalisationService from "../../services/GeolocalisationService";

const GeolocalisationDetail = () => {
  const { id } = useParams();
  const [geolocalisation, setGeolocalisation] = useState(null);

  useEffect(() => {
    GeolocalisationService.getById(id)
      .then(response => setGeolocalisation(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  }, [id]);

  if (!geolocalisation) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Détails de la Géolocalisation</h2>
      <p>ID: {geolocalisation.id}</p>
      <p>Précision: {geolocalisation.gps_precision}</p>
      <p>Latitude: {geolocalisation.position.latitude}</p>
      <p>Longitude: {geolocalisation.position.longitude}</p>
    </div>
  );
};

export default GeolocalisationDetail;
