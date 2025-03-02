import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeletePlanning = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    console.log(`Planning avec ID ${id} supprimé`);
    navigate("/plannings");
  };

  return (
    <div>
      <h2>Supprimer le Planning</h2>
      <p>Es-tu sûr de vouloir supprimer ce planning ?</p>
      <button onClick={handleDelete}>Oui, supprimer</button>
      <button onClick={() => navigate("/plannings")}>Annuler</button>
    </div>
  );
};

export default DeletePlanning;
