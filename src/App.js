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
          <Route exact path="/login" element={<LandingPage />} />
          <Route exact path="/general" element={<Dashboard />} />
          <Route exact path="/eventos" element={<Eventos />} />
          <Route exact path="/eventos/:id" element={<Evento />} />
          <Route exact path="/eventos/:id/invitados" element={<Invitados />} />
          <Route
            exact
            path="/eventos/:id/nuevoinvitado"
            element={<NuevoInvitado />}
          />
          <Route exact path="/invitados/:id" element={<Invitado />} />
          <Route
            exact
            path="/eventos/:id/listas/crear"
            element={<CrearLista />}
          />
          <Route exact path="/evento/crear" element={<NuevoEvento />} />
          <Route exact path="/archivo" element={<Archivo />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
