import { useCategories } from "../context/CategoriesContext";

export function CategoryFilter({ onCategoryChange }) {
  const { categories } = useCategories();
  return (
    <div className="flex items-center gap-3">
      <label className="text-white font-bold" htmlFor="categories">
        Filtrar por categorias:
      </label>
      <select
        id="categories"
        className="bg-white rounded-lg p-2 w-40"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">Todas</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
