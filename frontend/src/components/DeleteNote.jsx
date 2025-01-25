import { useNotes } from "../context/NotesContext";
import { deleteNote } from "../services/api";

export function DeleteNote({ id, onClose }) {
  const { deleteNoteInContext } = useNotes();
  const handleDeleteNote = async () => {
    try {
      await deleteNote(id);
      deleteNoteInContext(id);
      onClose();
    } catch (error) {
      console.error("Error al eliminar la nota: ", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-red-500 text-center">
        Eliminar Nota
      </h2>
      <p className="text-center my-3">¿Estas seguro de eliminar está nota?</p>
      <div className="flex justify-center gap-4">
        <button
          className="bg-red-500 hover:bg-red-400 border-none rounded-lg p-2 text-white gap-2 font-semibold w-14"
          type="button"
          onClick={handleDeleteNote}
        >
          Si
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-400 border-none rounded-lg p-2 text-white gap-2 font-semibold w-14"
          onClick={onClose}
          type="button"
        >
          No
        </button>
      </div>
    </div>
  );
}
