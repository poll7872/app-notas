export function CategoryFilter() {
  return (
    <div className="flex items-center gap-3">
      <label className="text-white font-bold" htmlFor="categories">
        Filtrar por categorias:
      </label>
      <select id="categories" className="bg-white rounded-lg p-2 w-40">
        <option>Personal</option>
        <option>Trabajo</option>
        <option>Estudio</option>
      </select>
    </div>
  );
}
