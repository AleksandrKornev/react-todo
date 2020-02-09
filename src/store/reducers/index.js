import { NOTE_ADD, NOTE_EDIT, NOTE_DEL, INIT } from "../types";

const initState = {
  notes: []
}

function Auth(state = initState, action) {
  let notes, index;

  switch(action.type) {
    case NOTE_ADD:
      return {
        ...state, 
        notes: [...state.notes, action.data.note]
      }
    case NOTE_EDIT:
      index = action.data.index;
      notes = [...state.notes];
      notes[index] = action.data.note;

      return {
        ...state, 
        notes
      }
    case NOTE_DEL:
      index = action.data.index;
      notes = [...state.notes];
      notes.splice(index, 1);
      return {
        ...state, 
        notes
      }
    case INIT:
      return {
        ...state, 
        notes: action.data.notes
      }
    case "AUTH_USER":
      return Object.assign({}, state, action.data);
    case "LOGOUT":
      return Object.assign({}, state, { accessToken: null });
    case "LOAD_STORAGE":
      return Object.assign({}, state, action.data);
    default:
      return state
  }
}

export default Auth;