import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Eventos from "./components/Eventos/Eventos";
import Evento from "./components/Evento/Evento";
import CrearLista from "./components/CrearLista/CrearLista";
import NuevoEvento from "./components/NuevoEvento/NuevoEvento";
import Invitados from "./components/Invitados/Invitados";
import Invitado from "./components/Invitado/Invitado";
import Archivo from "./components/Archivo/Archivo";
import Landing from "./components/Landing/Landing";
import Error from "./components/Error/Error";
import NuevoInvitado from "./components/NuevoInvitado/NuevoInvitado";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<LandingPage />} />
          <Route path="/general" element={<Dashboard />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/:id" element={<Evento />} />
          <Route path="/eventos/:id/invitados" element={<Invitados />} />
          <Route
            path="/eventos/:id/nuevoinvitado"
            element={<NuevoInvitado />}
          />
          <Route path="/invitados/:id" element={<Invitado />} />
          <Route path="/eventos/:id/listas/crear" element={<CrearLista />} />
          <Route path="/evento/crear" element={<NuevoEvento />} />
          <Route path="/archivo" element={<Archivo />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
