import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AgentRoutes from "./AgentRoutes";
import MissionRoutes from "./MissionRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Importation des routes séparées */}
      {AgentRoutes()}
      {MissionRoutes()}
    </Routes>
  );
};

export default AppRoutes;
