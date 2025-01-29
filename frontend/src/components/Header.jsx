import { useLocation } from "react-router-dom";
import {
  DismissCircleFilled,
  LayoutRowThreeFilled,
} from "@fluentui/react-icons";
import { useState } from "react";
import { Modal } from "./Modal";
import { FormAddNote } from "./FormAddNote";
import { Categories } from "./Categories";
import { Menu } from "./Menu";
import { CategoryFilter } from "./CategoryFilter";

export function Header({ title }) {
  const location = useLocation();
  const [isAddNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [isCategorModalOpen, setCategorModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openAddNoteModal = () => setAddNoteModalOpen(true);
  const closeAddNoteModal = () => setAddNoteModalOpen(false);

  const openCategorModal = () => setCategorModalOpen(true);
  const closeCategorModal = () => setCategorModalOpen(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <header className="w-full md:w-8/12 my-8 mx-auto">
      <div>
        <h1 className="font-bold text-3xl text-white text-center">{title}</h1>
        <nav>
          {/* Menú para pantallas pequeñas */}
          <button
            className="bg-purple-900 rounded-lg p-2 md:hidden absolute top-6 right-3"
            onClick={toggleMenu}
          >
            <LayoutRowThreeFilled className="text-white text-xl" />
          </button>

          {/* Menú desplegable para pantallas pequeñas */}
          <div
            className={`fixed top-0 left-0 right-0 bg-purple-800 text-white p-6 transform transition-all duration-300 md:hidden flex flex-col items-center gap-6 ${
              isMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-7 right-4"
            >
              <DismissCircleFilled className="text-2xl" />
            </button>

            <Menu
              openAddNoteModal={openAddNoteModal}
              openCategorModal={openCategorModal}
              location={location}
            />
          </div>

          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex flex-col gap-6 mt-3">
            <div className="flex gap-6 items-center justify-start">
              <Menu
                openAddNoteModal={openAddNoteModal}
                openCategorModal={openCategorModal}
                location={location}
              />
            </div>
          </div>
        </nav>

        <div className="flex md:justify-end mt-4 justify-center items-center gap-6">
          <CategoryFilter />
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
