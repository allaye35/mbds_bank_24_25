// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";  // Importer AppRoutes qui contient toutes les routes

const App = () => {
  return (
    <Router>  {/* Router doit envelopper toute l'application pour gérer les routes */}
      <div>
        <h1>Gestion des Agents, Missions et Clients</h1>
        <AppRoutes />  {/* Utilisation des routes centralisées */}
      </div>
    </Router>
  );
};

export default App;
