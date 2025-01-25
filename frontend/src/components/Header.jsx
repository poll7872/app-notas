import { Link, useLocation } from "react-router-dom";
import { AddCircleFilled } from "@fluentui/react-icons";
import { useState } from "react";
import { Modal } from "./Modal";
import { FormAddNote } from "./FormAddNote";

export function Header({ title }) {
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <header className="w-8/12 my-8 mx-auto">
      <div>
        <h1 className="font-bold text-3xl text-white text-center">{title}</h1>
        <nav>
          <ul className="flex justify-center items-center gap-6 mt-3">
            <li>
              <Link
                className="hover:underline decoration-wavy decoration-white font-semibold"
                to={location.pathname === "/" ? "/notas-archivadas" : "/"}
              >
                {location.pathname === "/" ? "Notas Archivadas" : "Mis Notas"}
              </Link>
            </li>
            <li>Categorias</li>
          </ul>
        </nav>
      </div>
      <div className="mt-3 flex justify-between">
        <button
          className="bg-purple-800 rounded-lg p-2 text-white flex items-center gap-2 font-semibold"
          to="/"
          onClick={openModal}
        >
          Crear Nota
          <AddCircleFilled className="text-2xl" />
        </button>
        <div>
          <label className="text-white font-bold" htmlFor="categories">
            Filtrar por categorias:
          </label>
          <select className="bg-white rounded-lg p-2 w-40 ml-3 mr-2">
            <option>Personal</option>
          </select>
        </div>
      </div>
      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <FormAddNote />
      </Modal>
    </header>
  );
}
