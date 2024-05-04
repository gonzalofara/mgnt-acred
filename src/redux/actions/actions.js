import axios from "axios";

export const GET_ALL_EVENTS = "GET_ALL_EVENTS";
export const POST_EVENT = "POST_EVENT";
export const GET_EVENT_DETAIL = "GET_EVENT_DETAIL";
export const SET_EVENT_STATUS = "SET_EVENT_STATUS";
export const SET_INVITADO_STATUS = "SET_INVITADO_STATUS";
export const GET_INVITADO = "GET_INVITADO";
export const RESET_EVENT_DETAIL = "RESET_EVENT_DETAIL";
export const RESET_INVITADO_DETAIL = "RESET_INVITADO_DETAIL";

export function getAllEvents() {
  return async function (dispatch) {
    try {
      const events = await axios.get(
        "https://radiant-surprise-production.up.railway.app/eventos"
       
      );
      return dispatch({
        type: GET_ALL_EVENTS,
        payload: events.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function getEventDetail(id) {
  return async function (dispatch) {
    try {
      const events = await axios.get(
        "https://radiant-surprise-production.up.railway.app/eventos/" + id
      );
      return dispatch({
        type: GET_EVENT_DETAIL,
        payload: events.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export function setEventStatus(id, status, archived) {
  return async function (dispatch) {
    if (status) {
      try {
        const events = await axios.patch(
          "https://radiant-surprise-production.up.railway.app/eventos/" + id,
          status
        );
        return dispatch({
          type: SET_EVENT_STATUS,
          payload: events.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    } else if (archived) {
      try {
        const events = await axios.patch(
          "https://radiant-surprise-production.up.railway.app/eventos/" + id,
          archived
        );
        return dispatch({
          type: SET_EVENT_STATUS,
          payload: events.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
}

export function setInvitadoStatus(id, status) {
  return async function (dispatch) {
    try {
      const invitado = await axios.patch(
        "https://radiant-surprise-production.up.railway.app/invitados/" + id,
        status
      );
      return dispatch({
        type: SET_INVITADO_STATUS,
        payload: invitado.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function resetEventDetail() {
  return function (dispatch) {
    return dispatch({
      type: RESET_EVENT_DETAIL,
    });
  };
}
export function resetInvitadoDetail() {
  return function (dispatch) {
    return dispatch({
      type: RESET_INVITADO_DETAIL,
    });
  };
}

export function postEvents(evento) {
  console.log(evento);
  return async function () {
    try {
      var json = await axios.post(
        "https://radiant-surprise-production.up.railway.app/eventos",
        evento
      );
      console.log(json.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };
}
export function createList(id, lista) {
  try {
    return async function (dispatch) {
      return await axios.post(
        `https://radiant-surprise-production.up.railway.app/invitados/${id}`,
        lista
      );
    };
  } catch (error) {
    console.log(error.message);
  }
}
export function getInvitado(id) {
  try {
    return async function (dispatch) {
      const invitado = await axios.get(
        `https://radiant-surprise-production.up.railway.app/invitados/${id}`
      );
      return dispatch({
        type: GET_INVITADO,
        payload: invitado.data,
      });
    };
  } catch (error) {
    console.log(error.message);
  }
}
