import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeolocalisationService from "../../services/GeolocalisationService";

const CreateGeolocalisation = () => {
  const [gps, setGps] = useState({ gps_precision: "", position: { latitude: "", longitude: "" } });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "latitude" || name === "longitude") {
      setGps({ ...gps, position: { ...gps.position, [name]: value } });
    } else {
      setGps({ ...gps, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    GeolocalisationService.createGeolocalisation(gps)
      .then(() => navigate("/geolocalisations"))
      .catch(error => console.error("Erreur de création", error));
  };

  return (
    <div>
      <h2>Créer une Géolocalisation</h2>
      <form onSubmit={handleSubmit}>
        <label>Précision GPS:</label>
        <input type="number" name="gps_precision" value={gps.gps_precision} onChange={handleChange} required />
        <br />
        <label>Latitude:</label>
        <input type="text" name="latitude" value={gps.position.latitude} onChange={handleChange} required />
        <br />
        <label>Longitude:</label>
        <input type="text" name="longitude" value={gps.position.longitude} onChange={handleChange} required />
        <br />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateGeolocalisation;
