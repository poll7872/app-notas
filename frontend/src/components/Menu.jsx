import { Link } from "react-router-dom";
import { AddCircleFilled, BookmarkFilled } from "@fluentui/react-icons";

export function Menu({ openAddNoteModal, openCategorModal, location }) {
  return (
    <>
      <button
        className="bg-purple-800 rounded-lg p-2 text-white flex items-center gap-2 font-semibold"
        onClick={openAddNoteModal}
      >
        Crear Nota
        <AddCircleFilled className="text-2xl" />
      </button>
      <button
        className="bg-purple-800 rounded-lg p-2 text-white flex items-center gap-2 font-semibold"
        onClick={openCategorModal}
      >
        Categorias
        <BookmarkFilled className="text-2xl" />
      </button>
      <Link
        className="hover:underline decoration-wavy decoration-white font-semibold"
        to={location.pathname === "/" ? "/notas-archivadas" : "/"}
      >
        {location.pathname === "/" ? "Notas Archivadas" : "Mis Notas"}
      </Link>
    </>
  );
}
