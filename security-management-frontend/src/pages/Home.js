import React from "react";
import { Link } from "react-router-dom";
import { FaUserShield, FaTasks, FaCalendarAlt, FaBuilding } from "react-icons/fa"; // Import des icônes
import "../styles/Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src="/logo.png" alt="Boulevard Sécurité Logo" className="logo" />
        <h1>Bienvenue sur Boulevard Sécurité</h1>
        <p>Votre solution pour la gestion des agents de sécurité, des missions et des plannings.</p>
      </header>
      
      <div className="home-buttons">
        <Link to="/agents" className="home-button">
          <FaUserShield className="icon" /> Gestion des Agents
        </Link>
        <Link to="/missions" className="home-button">
          <FaTasks className="icon" /> Gestion des Missions
        </Link>
        <Link to="/planning" className="home-button">
          <FaCalendarAlt className="icon" /> Gestion du Planning
        </Link>
        <Link to="/clients" className="home-button">
          <FaBuilding className="icon" /> Gestion des Clients
        </Link>
      </div>
    </div>
  );
};

export default Home;
