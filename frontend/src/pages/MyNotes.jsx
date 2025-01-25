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
      <main className="w-8/12 mx-auto grid grid-cols-3 gap-3">
        {activeNotes.map((note) => (
          <CardNote key={note.id} note={note} />
        ))}
      </main>
    </>
  );
}
