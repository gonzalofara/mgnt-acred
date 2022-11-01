import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={LandingPage} />
          <Route path="/general" component={Dashboard} />
          <Route path="/eventos" component={Eventos} />
          <Route path="/eventos/:id" component={Evento} />
          <Route path="/eventos/:id/invitados" component={Invitados} />
          <Route path="/eventos/:id/nuevoinvitado" component={NuevoInvitado} />
          <Route path="/invitados/:id" component={Invitado} />
          <Route path="/eventos/:id/listas/crear" component={CrearLista} />
          <Route path="/evento/crear" component={NuevoEvento} />
          <Route path="/archivo" component={Archivo} />
          <Route path="*" component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
