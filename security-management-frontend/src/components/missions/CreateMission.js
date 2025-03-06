import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MissionService from "../../services/MissionService";
import EntrepriseService from "../../services/EntrepriseService";

const CreateMission = () => {
  const [mission, setMission] = useState({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    statutMission: "PLANIFIEE", // ✅ Correction ici
    entrepriseId: "", // Initialisé vide
  });

  const [entreprises, setEntreprises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const entreprisesData = await EntrepriseService.getAllEntreprises();
        setEntreprises(entreprisesData.data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des entreprises :", error);
      }
    };
    fetchEntreprises();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMission({ ...mission, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!mission.titre || !mission.description || !mission.dateDebut || !mission.dateFin || !mission.entrepriseId) {
      setErrorMessage("⚠️ Tous les champs sont obligatoires !");
      setIsLoading(false);
      return;
    }

    // Vérification du statutMission avant d'envoyer au backend
    if (!["PLANIFIEE", "EN_COURS", "TERMINEE", "ANNULEE"].includes(mission.statutMission)) {
      setErrorMessage("⚠️ Statut de mission invalide !");
      setIsLoading(false);
      return;
    }

    const payload = {
      titre: mission.titre,
      description: mission.description,
      dateDebut: mission.dateDebut,
      dateFin: mission.dateFin,
      statutMission: mission.statutMission,
      entreprise: { id: Number(mission.entrepriseId) }, // 🔥 Convertir en Number
    };

    console.log("📤 Payload envoyé :", JSON.stringify(payload, null, 2));

    try {
      await MissionService.createMission(payload);
      alert("✅ Mission créée avec succès !");
      navigate("/missions");
    } catch (error) {
      console.error("❌ Erreur lors de la création de la mission :", error.response?.data || error.message);
      setErrorMessage("⚠️ " + (error.response?.data?.message || "Erreur inconnue"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Créer une Mission</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Titre:</label>
        <input type="text" name="titre" value={mission.titre} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={mission.description} onChange={handleChange} required />

        <label>Date de début:</label>
        <input type="date" name="dateDebut" value={mission.dateDebut} onChange={handleChange} required />

        <label>Date de fin:</label>
        <input type="date" name="dateFin" value={mission.dateFin} onChange={handleChange} required />

        <label>Statut:</label>
        <select name="statutMission" value={mission.statutMission} onChange={handleChange} required>
          <option value="PLANIFIEE">Planifiée</option>  {/* ✅ Correction ici */}
          <option value="EN_COURS">En Cours</option>
          <option value="TERMINEE">Terminée</option>
          <option value="ANNULEE">Annulée</option>
        </select>

        <label>Entreprise:</label>
        <select name="entrepriseId" value={mission.entrepriseId} onChange={handleChange} required>
          <option value="">Sélectionner une entreprise</option>
          {entreprises.map((entreprise) => (
            <option key={entreprise.id} value={entreprise.id}>
              {entreprise.nom}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Création..." : "Créer Mission"}
        </button>
      </form>
    </div>
  );
};

export default CreateMission;
