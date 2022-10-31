import {
  GET_ALL_EVENTS,
  GET_EVENT_DETAIL,
  SET_EVENT_STATUS,
  SET_INVITADO_STATUS,
  GET_INVITADO,
  RESET_EVENT_DETAIL,
  RESET_INVITADO_DETAIL,
} from "../actions/actions";

const initialState = {
  eventos: [],
  evento: {},
  invitado: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        eventos: action.payload,
      };
    case GET_EVENT_DETAIL:
      return {
        ...state,
        evento: action.payload,
      };
    case SET_EVENT_STATUS:
      return {
        ...state,
        evento: action.payload,
      };
    case SET_INVITADO_STATUS:
      return {
        ...state,
        invitado: action.payload,
      };

    case GET_INVITADO:
      return {
        ...state,
        invitado: action.payload,
      };
    case RESET_EVENT_DETAIL:
      return {
        ...state,
        evento: {},
        invitado: {},
      };
    case RESET_INVITADO_DETAIL:
      return {
        ...state,
        invitado: {},
      };
    default:
      return state;
  }
};

export default rootReducer;
