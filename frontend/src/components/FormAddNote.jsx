import { useEffect, useState } from "react";
import { createNote, getCategories } from "../services/api";
import { DismissCircleFilled } from "@fluentui/react-icons";
import { useNotes } from "../context/NotesContext";

export function FormAddNote() {
  const { addNote } = useNotes();
  const [categories, setCategories] = useState([]);
  const [note, setNote] = useState({
    title: "",
    content: "",
    state: "note",
    categoryIds: [],
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log("Error al obtener las notas: ", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdNote = await createNote(note);
      addNote(createdNote);
      console.log("Nota creada: ", createdNote);
      //limpiar el formulario aqui
      setNote({
        title: "",
        content: "",
        state: "note",
        categoryIds: [],
      });
      setSelectedCategoryId("");
    } catch (error) {
      console.error("Error al crear la nota: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleAddCategory = () => {
    if (selectedCategoryId && !note.categoryIds.includes(selectedCategoryId)) {
      setNote({
        ...note,
        categoryIds: [...note.categoryIds, selectedCategoryId],
      });

      setSelectedCategoryId("");
    }
  };

  const handleRemoveCategory = (idToRemove) => {
    setNote({
      ...note,
      categoryIds: note.categoryIds.filter((id) => id != idToRemove),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <legend className="text-xl text-center text-purple-600 font-bold">
          Crear Nota
        </legend>

        <div className="grid gap-1 mb-4 mt-2">
          <label className="font-bold" htmlFor="title">
            Titulo:
          </label>
          <input
            id="title"
            name="title"
            value={note.title}
            type="text"
            placeholder="Titulo de la nota..."
            className="rounded-md p-2 border border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 block w-full"
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
            value={note.content}
            placeholder="Contenido de la nota..."
            className="rounded-md p-2 border border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 block w-full h-40"
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
              value={selectedCategoryId}
              id="categories"
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
          {note.categoryIds.map((categoryId) => {
            const category = categories.find(
              (cat) => String(cat.id) === String(categoryId),
            );
            return (
              <label
                key={categoryId}
                className="bg-purple-600 text-white p-1 rounded-lg"
              >
                {category ? category.name : "Categoria Desconocida"}
                <DismissCircleFilled
                  className="ml-2 cursor-pointer"
                  onClick={() => handleRemoveCategory(categoryId)}
                />
              </label>
            );
          })}
        </div>

        <button
          className="bg-purple-800 hover:bg-purple-600 border-none rounded-lg p-2 text-white font-semibold"
          type="submit"
        >
          Crear Nota
        </button>
      </form>
    </>
  );
}
