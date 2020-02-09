import { NOTE_ADD, NOTE_EDIT, NOTE_DEL, INIT, ERR } from "../types";
import store from "../index";


import { recordStorage, readStorage } from "../../service/index";
 
export function addNote(note) {
  if (!note.hasOwnProperty("text")) return { type: ERR };
  
  let notes = [ ...store.getState().notes ];
  note.isFavorites = null;

  notes.push(note);
  recordStorage("notes", notes);

  return {
    type: NOTE_ADD,
    data: { 
      note
    }
  }
}

export function editNote(note, index) {
  if (!note.hasOwnProperty("text")) return { type: ERR };
  
  let notes = [ ...store.getState().notes ];
  notes[index] = note;
  recordStorage("notes", notes);

  return {
    type: NOTE_EDIT,
    data: { 
      note,
      index
    }
  }
}

export function deleteNote(index) {
  let notes = [ ...store.getState().notes ];
  notes.splice(index, 1)
  recordStorage("notes", notes);

  return {
    type: NOTE_DEL,
    data: { 
      index
    }
  }
}

export function init() {
  let notes = readStorage("notes");
  
  if (!notes || !Array.isArray(notes)) {
    notes = [];
    recordStorage("notes", notes);
  }

  return {
    type: INIT,
    data: {
      notes
    }
  }
}