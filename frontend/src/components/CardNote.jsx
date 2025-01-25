import {
  ArchiveFilled,
  DeleteFilled,
  NoteEditFilled,
  NoteFilled,
} from "@fluentui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { Modal } from "./Modal";
import { FormEditNote } from "./FormEditNote";
import { DeleteNote } from "./DeleteNote";
import { useNotes } from "../context/NotesContext";
import { Note } from "./Note";

export function CardNote({ note }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isNoteModalOpen, setNoteModalOpen] = useState(false);
  const { toggleArchiveNote } = useNotes();

  const openEditModalForm = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const openNoteModal = () => setNoteModalOpen(true);
  const closeNoteModal = () => setNoteModalOpen(false);

  const handleToggleArchiveNote = async () => {
    try {
      await toggleArchiveNote(note.id);
    } catch (error) {
      console.error("Error al cambiar el estado de la nota: ", error);
    }
  };

  return (
    <>
      <article className="bg-white w-80 rounded-lg p-1 hover:border border-purple-800 hover:shadow-2xl hover:shadow-purple-900/50">
        <div className="flex items-center">
          <NoteFilled
            onClick={openNoteModal}
            className="text-7xl cursor-pointer text-purple-600"
          />
          <div className="font-bold">
            <h2 className="text-base">{note.title}</h2>
            <p className="text-sm">
              Ultima modificación:
              {format(note.updatedAt, "dd/MMM/yy", { locale: es })}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <ArchiveFilled
            onClick={handleToggleArchiveNote}
            className="text-green-500 text-2xl cursor-pointer"
          />
          <NoteEditFilled
            onClick={openEditModalForm}
            className="text-blue-500 text-2xl cursor-pointer"
          />
          <DeleteFilled
            onClick={openDeleteModal}
            className="text-red-500 text-2xl cursor-pointer"
          />
        </div>
      </article>

      {/* MODALS */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <FormEditNote note={note} onClose={closeEditModal} />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <DeleteNote id={note.id} onClose={closeDeleteModal} />
      </Modal>
      <Modal isOpen={isNoteModalOpen} onClose={closeNoteModal}>
        <Note note={note} />
      </Modal>
    </>
  );
}
