import { DismissCircleFilled } from "@fluentui/react-icons";
import { useNotes } from "../context/NotesContext";
import { useState } from "react";
import { updateNote as updateNoteApi } from "../services/api";
import { useCategories } from "../context/CategoriesContext";

export function FormEditNote({ note, onClose }) {
  const { updateNoteInContext } = useNotes();
  const { categories } = useCategories();
  const [editedNote, setEditedNote] = useState({
    ...note,
    categories: note.categories || [],
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const noteToUpdate = {
        title: editedNote.title,
        content: editedNote.content,
        state: editedNote.state || "note",
        categoryIds: editedNote.categories.map((cat) => cat.id),
      };
      const updatedNote = await updateNoteApi(editedNote.id, noteToUpdate);
      updateNoteInContext(updatedNote);
      onClose();
    } catch (error) {
      console.error("Error al actualizar la nota: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote({
      ...editedNote,
      [name]: value,
    });
  };

  const handleAddCategory = () => {
    if (selectedCategoryId) {
      const categoryToAdd = categories.find(
        (cat) => cat.id === Number(selectedCategoryId),
      );

      if (
        categoryToAdd &&
        !editedNote.categories.some((cat) => cat.id === categoryToAdd.id)
      ) {
        setEditedNote({
          ...editedNote,
          categories: [...editedNote.categories, categoryToAdd],
        });
        setSelectedCategoryId("");
      }
    }
  };

  const handleRemoveCategory = (idToRemove) => {
    setEditedNote({
      ...editedNote,
      categories: editedNote.categories.filter((cat) => cat.id !== idToRemove),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <legend className="text-xl text-center text-purple-600 font-bold">
          Editar Nota
        </legend>

        <div className="grid gap-1 mb-4 mt-2">
          <label className="font-bold" htmlFor="title">
            Titulo:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Titulo de la nota..."
            className="rounded-md p-2 border border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 block w-full"
            value={editedNote.title}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1 mb-4 mt-2">
          <label className="font-bold" htmlFor="content">
            Contenido:
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Contenido de la nota..."
            className="rounded-md p-2 border border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 block w-full h-40"
            value={editedNote.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="grid gap-1 mb-4 mt-2">
          <label className="font-bold" htmlFor="categories">
            Categorias:
          </label>
          <div className="flex gap-1">
            <select
              className="rounded-md p-2 border border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 block w-full"
              name="categoryIds"
              id="categories"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option value="" disabled>
                Selecciona una Categoria
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              className="bg-purple-800 hover:bg-purple-600 border-none rounded-lg p-2 text-white font-semibold"
              type="button"
              onClick={handleAddCategory}
            >
              Añadir
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-4 mt-2">
          {editedNote.categories.map((category) => (
            <label
              key={category.id}
              className="bg-purple-600 text-white p-1 rounded-lg"
            >
              {category.name}
              <DismissCircleFilled
                onClick={() => handleRemoveCategory(category.id)}
                className="ml-2 cursor-pointer"
              />
            </label>
          ))}
        </div>

        <button
          className="bg-purple-800 hover:bg-purple-600 border-none rounded-lg p-2 text-white font-semibold"
          type="submit"
        >
          Guardar Cambios
        </button>
      </form>
    </>
  );
}
