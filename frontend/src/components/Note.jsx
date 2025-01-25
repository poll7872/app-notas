export function Note({ note }) {
  return (
    <article>
      <header>
        <h1 className="text-center text-xl text-purple-600 font-bold">
          {note.title}
        </h1>
      </header>

      <section className="mt-2 mb-4">
        <h2 className="font-bold">Contenido</h2>
        <p className="whitespace-pre-wrap">{note.content}</p>
      </section>

      <section>
        <h2 className="font-bold">Categorías</h2>
        <ul className="flex gap-2 mb-4 mt-2">
          {note.categories.map((category) => (
            <li
              key={category.id}
              className="bg-purple-600 text-white p-1 rounded-lg"
            >
              {category.name}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
