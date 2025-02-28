import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AgentList from "./components/AgentList";
import CreateAgent from "./components/CreateAgent";
import EditAgent from "./components/EditAgent";
import AgentDetail from "./components/AgentDetail";
import DeleteAgent from "./components/DeleteAgent";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<AgentList />} />
        <Route path="/agents/edit/:id" element={<EditAgent />} />
        <Route path="/agents/create" element={<CreateAgent />} />
        <Route path="/agents/:id" element={<AgentDetail />} />
        <Route path="/agents/delete/:id" element={<DeleteAgent />} />        
        <Route path="/missions" element={<h2>Page de gestion des Missions</h2>} />
        <Route path="/planning" element={<h2>Page de gestion du Planning</h2>} />
        <Route path="/clients" element={<h2>Page de gestion des Clients</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
