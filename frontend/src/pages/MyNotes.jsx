import { Header } from "../components/Header";
import { CardNote } from "../components/CardNote";
import { useNotes } from "../context/NotesContext";
import { useState } from "react";

export function MyNotes() {
  const { notes } = useNotes();
  const [selectedCategory, setselectedCategory] = useState("all");

  //Filtrar las notas donde su state sea note. Filtrado por categories
  const activeNotes = notes
    .filter((note) => note.state === "note")
    .filter((note) =>
      selectedCategory === "all"
        ? true
        : note.categories.some(
            (category) => category.name === selectedCategory,
          ),
    );

  return (
    <>
      <Header title={"Mis Notas"} onCategoryChange={setselectedCategory} />
      <main className="w-full md:w-8/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:p-0 p-4 gap-3">
        {activeNotes.map((note) => (
          <CardNote key={note.id} note={note} />
        ))}
      </main>
    </>
  );
}
