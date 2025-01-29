import { Header } from "../components/Header";
import { CardNote } from "../components/CardNote";
import { useNotes } from "../context/NotesContext";

export function MyNotes() {
  const { notes } = useNotes();

  //FIltrar las notas no archivadas
  const activeNotes = notes.filter((note) => note.state === "note");

  return (
    <>
      <Header title={"Mis Notas"} />
      <main className="w-full md:w-8/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:p-0 p-4 gap-3">
        {activeNotes.map((note) => (
          <CardNote key={note.id} note={note} />
        ))}
      </main>
    </>
  );
}
