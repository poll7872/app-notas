import {
  BookmarkAddFilled,
  BookmarkFilled,
  DeleteFilled,
  NoteEditFilled,
} from "@fluentui/react-icons";
import { useCategories } from "../context/CategoriesContext";
import { createCategory } from "../services/api";
import { useState } from "react";

export function Categories() {
  const { categories, addCategory } = useCategories();
  const [category, setCategory] = useState({
    name: "",
  });

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
                <h2 className="font-bold">{category.name}</h2>
              </div>
              <div className="flex items-center gap-1">
                <button>
                  <NoteEditFilled className="text-2xl text-blue-800 cursor-pointer" />
                </button>
                <button>
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
