import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// Importation des composants pour chaque module
import AgentList from "./components/agents/AgentList";
import CreateAgent from "./components/agents/CreateAgent";
import EditAgent from "./components/agents/EditAgent";
import AgentDetail from "./components/agents/AgentDetail";
import DeleteAgent from "./components/agents/DeleteAgent";

import EntrepriseList from "./components/entreprises/EntrepriseList";
import CreateEntreprise from "./components/entreprises/CreateEntreprise";
import EditEntreprise from "./components/entreprises/EditEntreprise";
import EntrepriseDetail from "./components/entreprises/EntrepriseDetail";
import DeleteEntreprise from "./components/entreprises/DeleteEntreprise";

import GeolocalisationList from "./components/geolocalisations/GeolocalisationList";
import CreateGeolocalisation from "./components/geolocalisations/CreateGeolocalisation";
import EditGeolocalisation from "./components/geolocalisations/EditGeolocalisation";
import GeolocalisationDetail from "./components/geolocalisations/GeolocalisationDetail";
import DeleteGeolocalisation from "./components/geolocalisations/DeleteGeolocalisation";

import MissionList from "./components/missions/MissionList";
import EditMission from "./components/missions/EditMission";
import MissionDetail from "./components/missions/MissionDetail";
import DeleteMission from "./components/missions/DeleteMission";

import PlanningList from "./components/plannings/PlanningList";
import CreatePlanning from "./components/plannings/CreatePlanning";
import EditPlanning from "./components/plannings/EditPlanning";
import PlanningDetail from "./components/plannings/PlanningDetail";
import DeletePlanning from "./components/plannings/DeletePlanning";

import SiteList from "./components/sites/SiteList";
import CreateSite from "./components/sites/CreateSite";
import EditSite from "./components/sites/EditSite";
import SiteDetail from "./components/sites/SiteDetail";
import DeleteSite from "./components/sites/DeleteSite";

import RapportList from "./components/rapports/RapportList";
import CreateRapport from "./components/rapports/CreateRapport";
import EditRapport from "./components/rapports/EditRapport";
import RapportDetail from "./components/rapports/RapportDetail";
import DeleteRapport from "./components/rapports/DeleteRapport";
import CreateMission from "./components/missions/CreateMission";


import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />


      <Route path="/" element={<Home />} />
        <Route path="/rapports" element={<RapportList />} />
        <Route path="/rapports/create" element={<CreateRapport />} />
        <Route path="/rapports/edit/:id" element={<EditRapport />} />
        <Route path="/rapports/:id" element={<RapportDetail />} />
        <Route path="/rapports/delete/:id" element={<DeleteRapport />} />

        {/* Routes Agents */}
        <Route path="/agents" element={<AgentList />} />
        <Route path="/agents/create" element={<CreateAgent />} />
        <Route path="/agents/edit/:id" element={<EditAgent />} />
        <Route path="/agents/delete/:id" element={<DeleteAgent />} />
        <Route path="/agents/:id" element={<AgentDetail />} />

        {/* Routes Entreprises */}
        <Route path="/entreprises" element={<EntrepriseList />} />
        <Route path="/entreprises/create" element={<CreateEntreprise />} />
        <Route path="/entreprises/edit/:id" element={<EditEntreprise />} />
        <Route path="/entreprises/delete/:id" element={<DeleteEntreprise />} />
        <Route path="/entreprises/:id" element={<EntrepriseDetail />} />

        {/* Routes Géolocalisation */}
        <Route path="/geolocalisations" element={<GeolocalisationList />} />
        <Route path="/geolocalisations/create" element={<CreateGeolocalisation />} />
        <Route path="/geolocalisations/edit/:id" element={<EditGeolocalisation />} />
        <Route path="/geolocalisations/delete/:id" element={<DeleteGeolocalisation />} />
        <Route path="/geolocalisations/:id" element={<GeolocalisationDetail />} />

        {/* Routes Missions */}
        <Route path="/missions" element={<MissionList />} />
        <Route path="/missions/create" element={<CreateMission />} />
        <Route path="/missions/edit/:id" element={<EditMission />} />
        <Route path="/missions/delete/:id" element={<DeleteMission />} />
        <Route path="/missions/:id" element={<MissionDetail />} />

        {/* Routes Plannings */}
        <Route path="/plannings" element={<PlanningList />} />
        <Route path="/plannings/create" element={<CreatePlanning />} />
        <Route path="/plannings/edit/:id" element={<EditPlanning />} />
        <Route path="/plannings/delete/:id" element={<DeletePlanning />} />
        <Route path="/plannings/:id" element={<PlanningDetail />} />

        {/* Routes Sites */}
        <Route path="/sites" element={<SiteList />} />
        <Route path="/sites/create" element={<CreateSite />} />
        <Route path="/sites/edit/:id" element={<EditSite />} />
        <Route path="/sites/delete/:id" element={<DeleteSite />} />
        <Route path="/sites/:id" element={<SiteDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
