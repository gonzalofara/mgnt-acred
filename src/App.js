import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
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
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={LandingPage} />
          <Route exact path="/general" component={Dashboard} />
          <Route exact path="/eventos" component={Eventos} />
          <Route exact path="/eventos/:id" component={Evento} />
          <Route exact path="/eventos/:id/invitados" component={Invitados} />
          <Route
            exact
            path="/eventos/:id/nuevoinvitado"
            component={NuevoInvitado}
          />
          <Route exact path="/invitados/:id" component={Invitado} />
          <Route
            exact
            path="/eventos/:id/listas/crear"
            component={CrearLista}
          />
          <Route exact path="/evento/crear" component={NuevoEvento} />
          <Route exact path="/archivo" component={Archivo} />
          <Route path="*" component={Error} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
