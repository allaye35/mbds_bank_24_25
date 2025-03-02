import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import EntrepriseService from "../../services/EntrepriseService";

const EntrepriseDetail = () => {
  const { id } = useParams();
  const [entreprise, setEntreprise] = useState(null);

  useEffect(() => {
    EntrepriseService.getEntrepriseById(id)
      .then(response => setEntreprise(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  }, [id]);

  if (!entreprise) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Détails de l'Entreprise</h2>
      <p><strong>Nom:</strong> {entreprise.nom}</p>
      <p><strong>Adresse:</strong> {entreprise.adresse}</p>
      <p><strong>Téléphone:</strong> {entreprise.telephone}</p>
      <p><strong>Email:</strong> {entreprise.email}</p>
      <Link to="/entreprises">Retour à la liste</Link>
    </div>
  );
};

export default EntrepriseDetail;
