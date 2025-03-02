import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SiteService from "../../services/SiteService"; // Vérifie que ce fichier existe

const CreateSite = () => {
  const [site, setSite] = useState({
    nom: "",
    adresse: "",
  });

  const navigate = useNavigate();

  // 🔹 Gérer les changements des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSite({ ...site, [name]: value });
  };

  // 🔹 Soumettre le formulaire pour créer un site
  const handleSubmit = (e) => {
    e.preventDefault();
    SiteService.createSite(site)
      .then(() => {
        alert("Site créé avec succès !");
        navigate("/sites"); // Redirection vers la liste des sites
      })
      .catch((error) => {
        console.error("Erreur lors de la création du site :", error);
        alert("Erreur lors de la création du site.");
      });
  };

  return (
    <div>
      <h2>Créer un Site</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input
          type="text"
          name="nom"
          value={site.nom}
          onChange={handleChange}
          required
        />
        <br />
        <label>Adresse :</label>
        <input
          type="text"
          name="adresse"
          value={site.adresse}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Créer Site</button>
      </form>
    </div>
  );
};

export default CreateSite;
