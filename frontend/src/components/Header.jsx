import { Link, useLocation } from "react-router-dom";
import { AddCircleFilled, BookmarkFilled } from "@fluentui/react-icons";
import { useState } from "react";
import { Modal } from "./Modal";
import { FormAddNote } from "./FormAddNote";
import { Categories } from "./Categories";

export function Header({ title }) {
  const location = useLocation();
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [isCategorModalOpen, setCategorModalOpen] = useState(false);

  const openAddNoteModal = () => setAddNoteModalOpen(true);
  const closeAddNoteModal = () => setAddNoteModalOpen(false);

  const openCategorModal = () => setCategorModalOpen(true);
  const closeCategorModal = () => setCategorModalOpen(false);

  return (
    <header className="w-8/12 my-8 mx-auto">
      <div>
        <h1 className="font-bold text-3xl text-white text-center">{title}</h1>
        <nav>
          <ul className="flex justify-center items-center gap-6 mt-3">
            <li>
              <button
                className="bg-purple-800 rounded-lg p-2 text-white flex items-center gap-2 font-semibold"
                to="/"
                onClick={openAddNoteModal}
              >
                Crear Nota
                <AddCircleFilled className="text-2xl" />
              </button>
            </li>
            <li>
              <Link
                className="hover:underline decoration-wavy decoration-white font-semibold"
                to={location.pathname === "/" ? "/notas-archivadas" : "/"}
              >
                {location.pathname === "/" ? "Notas Archivadas" : "Mis Notas"}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-purple-800 rounded-lg p-2 text-white flex items-center gap-2 font-semibold"
          to="/"
          onClick={openCategorModal}
        >
          Categorias
          <BookmarkFilled className="text-2xl" />
        </button>
        <div>
          <label className="text-white font-bold" htmlFor="categories">
            Filtrar por categorias:
          </label>
          <select
            id="categories"
            className="bg-white rounded-lg p-2 w-40 ml-3 mr-2"
          >
            <option>Personal</option>
          </select>
        </div>
      </div>
      {/* MODALS */}
      <Modal isOpen={isAddNoteModalOpen} onClose={closeAddNoteModal}>
        <FormAddNote />
      </Modal>
      <Modal isOpen={isCategorModalOpen} onClose={closeCategorModal}>
        <Categories />
      </Modal>
    </header>
  );
}
