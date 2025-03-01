// src/routes/MissionRoutes.js
import React from "react";
import { Route } from "react-router-dom";
import MissionList from "../components/missions/MissionList";
import CreateMission from "../components/missions/CreateMission";
import EditMission from "../components/missions/EditMission";
import MissionDetail from "../components/missions/MissionDetail";

const MissionRoutes = () => {
  return (
    <>
      <Route path="/missions" element={<MissionList />} />
      <Route path="/missions/create" element={<CreateMission />} />
      <Route path="/missions/edit/:id" element={<EditMission />} />
      <Route path="/missions/:id" element={<MissionDetail />} />
    </>
  );
};

export default MissionRoutes;
