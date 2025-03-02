import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SiteService from "../../services/SiteService";
const SiteDetail = () => {
  const { id } = useParams();
  const [site, setSite] = useState(null);

  useEffect(() => {
    SiteService.getSiteById(id)
      .then(response => setSite(response.data))
      .catch(error => console.error("Erreur de chargement", error));
  }, [id]);

  if (!site) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Détails du Site</h2>
      <p><strong>ID:</strong> {site.id}</p>
      <p><strong>Nom:</strong> {site.nom}</p>
      <p><strong>Adresse:</strong> {site.adresse}</p>
      <Link to="/sites">Retour à la liste</Link>
    </div>
  );
};

export default SiteDetail;
