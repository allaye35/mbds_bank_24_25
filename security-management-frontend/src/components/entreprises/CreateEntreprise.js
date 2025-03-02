import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EntrepriseService from "../../services/EntrepriseService";

const CreateEntreprise = () => {
  const [entreprise, setEntreprise] = useState({
    nom: "",
    adresse: "",
    telephone: "",
    email: ""
    // missions n'est pas inclus ici
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEntreprise({ ...entreprise, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payload envoyé :", entreprise);
    EntrepriseService.createEntreprise(entreprise)
      .then(() => navigate("/entreprises"))
      .catch(error => console.error("Erreur de création", error));
  };

  return (
    <div>
      <h2>Créer une Entreprise</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input type="text" name="nom" value={entreprise.nom} onChange={handleChange} required />
        <label>Adresse :</label>
        <input type="text" name="adresse" value={entreprise.adresse} onChange={handleChange} required />
        <label>Téléphone :</label>
        <input type="text" name="telephone" value={entreprise.telephone} onChange={handleChange} required />
        <label>Email :</label>
        <input type="email" name="email" value={entreprise.email} onChange={handleChange} required />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateEntreprise;
