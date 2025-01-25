import { createContext, useContext, useState, useEffect } from "react";
import { archiveNote, getAllNotes } from "../services/api";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes();
        setNotes(data);
      } catch (error) {
        console.log("Error al obtener notas: ", error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNoteInContext = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note,
      ),
    );
  };

  const deleteNoteInContext = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  //Función para archivar o desarchivar una nota.
  const toggleArchiveNote = async (id) => {
    try {
      //1. Encontrar la nota actual
      const stateToUpdate = notes.find((note) => note.id === id);

      //2. Cambiar el estado entre note y note_archived
      const newState =
        stateToUpdate.state === "note" ? "note_archived" : "note";

      //3. Actualiza la nota en el back
      const updatedNote = await archiveNote(id, newState);

      //4. actualizar la nota en el estado global
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, state: newState } : note,
        ),
      );

      return updatedNote;
    } catch (error) {
      console.error("Error toggling archive status: ", error);
      throw error;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNoteInContext,
        deleteNoteInContext,
        toggleArchiveNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
