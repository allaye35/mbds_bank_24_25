import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // ✅ Vérifier que le fichier existe dans `src/routes`

const App = () => {
  return (
    <Router>
      <div>
        <h1>Gestion des Agents, Missions et Clients</h1>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
