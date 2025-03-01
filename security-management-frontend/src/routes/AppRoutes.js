// src/routes/AppRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";  // Importation correcte
import AgentRoutes from "./AgentRoutes";   // Routes agents
import MissionRoutes from "./MissionRoutes";  // Routes missions
import ClientRoutes from "./ClientRoutes";  // Routes clients
import Home from "../pages/Home";  // Import de la page d'accueil

const AppRoutes = () => {
  return (
    <Routes>  {/* Les routes doivent être encapsulées dans <Routes> */}
      <Route path="/" element={<Home />} />  {/* Route vers la page d'accueil */}
      <AgentRoutes />  {/* Route pour les agents */}
      <MissionRoutes />  {/* Route pour les missions */}
      <ClientRoutes />  {/* Route pour les clients */}
    </Routes>
  );
};

export default AppRoutes;
