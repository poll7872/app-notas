import {
  BookmarkAddFilled,
  BookmarkFilled,
  DeleteFilled,
  NoteEditFilled,
  SaveEditFilled,
} from "@fluentui/react-icons";
import { useCategories } from "../context/CategoriesContext";
import {
  createCategory,
  deleteCategory,
  updatedCategory,
} from "../services/api";
import { useState } from "react";

export function Categories() {
  const { categories, addCategory, updateCatInContext, deleteCatInContext } =
    useCategories();
  const [category, setCategory] = useState({
    name: "",
  });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdCategory = await createCategory(category);
      addCategory(createdCategory);
      setCategory({
        name: "",
      });
    } catch (error) {
      console.error("Error al crear la category: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleEditClick = (categoryId, currentName) => {
    setEditingCategoryId(categoryId);
    setEditedName(currentName);
  };

  const handleSaveClick = async (categoryId) => {
    try {
      const updatedCategoryData = await updatedCategory(categoryId, {
        name: editedName,
      });

      updateCatInContext(updatedCategoryData);
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error al actualizar la categoria: ", error);
    }
  };

  const handleDeleteCat = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      deleteCatInContext(categoryId);
    } catch (error) {
      console.error("Error al eliminar la categoria: ", error);
    }
  };

  return (
    <section>
      <header>
        <h1 className="text-xl text-center font-bold text-purple-600">
          Categorías
        </h1>
      </header>

      <div className="my-4">
        <form onSubmit={handleSubmit} className="flex gap-1">
          <input
            id="category"
            name="name"
            type="text"
            placeholder="Crea tu categoría..."
            className="rounded-md p-2 border border-purple-300 focus:outline-none focus:border-purple-500 focus:ring-purple-500 focus:ring-1 block w-full"
            value={category.name}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-purple-800 rounded-lg p-2 text-white flex items-center gap-2 font-semibold"
          >
            Crear <BookmarkAddFilled className="text-xl" />
          </button>
        </form>
      </div>

      <ul className="mt-2">
        {categories.map((category) => (
          <li key={category.id} className="my-3">
            <article className="flex justify-between items-center bg-purple-400 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <BookmarkFilled
                  className="text-purple-800 text-3xl"
                  aria-hidden="true"
                />
                {editingCategoryId === category.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  <h2 className="font-bold">{category.name}</h2>
                )}
              </div>
              <div className="flex items-center gap-1">
                {editingCategoryId === category.id ? (
                  <button onClick={() => handleSaveClick(category.id)}>
                    <SaveEditFilled className="text-2xl text-green-500 cursor-pointer" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(category.id, category.name)}
                  >
                    <NoteEditFilled className="text-2xl text-blue-800 cursor-pointer" />
                  </button>
                )}
                <button onClick={() => handleDeleteCat(category.id)}>
                  <DeleteFilled className="text-2xl text-red-600 cursor-pointer" />
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
