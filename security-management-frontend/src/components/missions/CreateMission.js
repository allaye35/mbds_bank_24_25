import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MissionService from "../../services/MissionService";
import EntrepriseService from "../../services/EntrepriseService";
import SiteService from "../../services/SiteService";
import PlanningService from "../../services/PlanningService";
import AgentService from "../../services/AgentService";
import RapportService from "../../services/RapportService";
import GeolocalisationService from "../../services/GeolocalisationService";

const CreateMission = () => {
  const [mission, setMission] = useState({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    statutMission: "EN_COURS",
    siteId: "",
    planningId: "",
    entrepriseId: "",
    geolocalisationId: "",
    agents: [],
    rapports: []
  });

  const [entreprises, setEntreprises] = useState([]);
  const [sites, setSites] = useState([]);
  const [plannings, setPlannings] = useState([]);
  const [geolocalisations, setGeolocalisations] = useState([]);
  const [agents, setAgents] = useState([]);
  const [rapports, setRapports] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entreprisesData = await EntrepriseService.getAllEntreprises();
        setEntreprises(entreprisesData.data);

        const sitesData = await SiteService.getAllSites();
        setSites(sitesData.data);

        const planningsData = await PlanningService.getAllPlannings();
        setPlannings(planningsData.data);

        const geolocalisationsData = await GeolocalisationService.getAllGeolocalisations();
        setGeolocalisations(geolocalisationsData.data);

        const agentsData = await AgentService.getAllAgents();
        setAgents(agentsData.data);

        const rapportsData = await RapportService.getAllRapports();
        setRapports(rapportsData.data);

      } catch (error) {
        console.error("❌ Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  // Gère les champs simples (titre, description, etc.)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMission({ ...mission, [name]: value });
  };

  // Gère les champs de sélection multiple (agents, rapports)
  const handleMultiSelectChange = (e, field) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setMission({ ...mission, [field]: selectedOptions });
  };

  // Construit l'objet final et envoie la requête au backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construire l'objet payload attendu par le backend
    const payload = {
      titre: mission.titre,
      description: mission.description,
      dateDebut: mission.dateDebut,
      dateFin: mission.dateFin,
      statutMission: mission.statutMission,
      site: mission.siteId ? { id: mission.siteId } : null,
      planning: mission.planningId ? { id: mission.planningId } : null,
      entreprise: mission.entrepriseId ? { id: mission.entrepriseId } : null,
      geolocalisationGPS: mission.geolocalisationId ? { id: mission.geolocalisationId } : null,
      agents: mission.agents.map((agentId) => ({ id: agentId })),
      rapports: mission.rapports.map((rapportId) => ({ id: rapportId })),
    };

    console.log("Payload envoyé :", payload);

    MissionService.createMission(payload)
      .then(() => {
        alert("✅ Mission créée avec succès !");
        navigate("/missions");
      })
      .catch((error) => {
        console.error("❌ Erreur lors de la création de la mission :", error);
        alert("⚠️ Erreur lors de la création de la mission");
      });
  };

  return (
    <div>
      <h2>Créer une Mission</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre:</label>
        <input
          type="text"
          name="titre"
          value={mission.titre}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={mission.description}
          onChange={handleChange}
          required
        />

        <label>Date de début:</label>
        <input
          type="date"
          name="dateDebut"
          value={mission.dateDebut}
          onChange={handleChange}
          required
        />

        <label>Date de fin:</label>
        <input
          type="date"
          name="dateFin"
          value={mission.dateFin}
          onChange={handleChange}
          required
        />

        <label>Statut:</label>
        <select
          name="statutMission"
          value={mission.statutMission}
          onChange={handleChange}
        >
          <option value="EN_COURS">En Cours</option>
          <option value="TERMINEE">Terminée</option>
          <option value="EN_ATTENTE">En Attente</option>
        </select>

        <label>Site:</label>
        <select
          name="siteId"
          value={mission.siteId}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner un site</option>
          {sites.map((site) => (
            <option key={site.id} value={site.id}>
              {site.nom}
            </option>
          ))}
        </select>

        <label>Planning:</label>
        <select
          name="planningId"
          value={mission.planningId}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner un planning</option>
          {plannings.map((planning) => (
            <option key={planning.id} value={planning.id}>
              {planning.date}
            </option>
          ))}
        </select>

        <label>Entreprise:</label>
        <select
          name="entrepriseId"
          value={mission.entrepriseId}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner une entreprise</option>
          {entreprises.map((entreprise) => (
            <option key={entreprise.id} value={entreprise.id}>
              {entreprise.nom}
            </option>
          ))}
        </select>

        <label>Géolocalisation:</label>
        <select
          name="geolocalisationId"
          value={mission.geolocalisationId}
          onChange={handleChange}
        >
          <option value="">Sélectionner une localisation</option>
          {geolocalisations.map((geo) => (
            <option key={geo.id} value={geo.id}>
              {geo.position.latitude}, {geo.position.longitude}
            </option>
          ))}
        </select>

        <label>Agents assignés:</label>
        <select
          name="agents"
          multiple
          value={mission.agents}
          onChange={(e) => handleMultiSelectChange(e, "agents")}
        >
          {agents.length === 0 && (
            <option disabled>Aucun agent disponible</option>
          )}
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.nom} {agent.prenom}
            </option>
          ))}
        </select>

        <label>Rapports associés:</label>
        <select
          name="rapports"
          multiple
          value={mission.rapports}
          onChange={(e) => handleMultiSelectChange(e, "rapports")}
        >
          {rapports.length === 0 && (
            <option disabled>Aucun rapport disponible</option>
          )}
          {rapports.map((rapport) => (
            <option key={rapport.id} value={rapport.id}>
              {rapport.description}
            </option>
          ))}
        </select>

        <button type="submit">Créer Mission</button>
      </form>
    </div>
  );
};

export default CreateMission;
