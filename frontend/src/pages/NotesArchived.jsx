import { CardNote } from "../components/CardNote";
import { Header } from "../components/Header";
import { useNotes } from "../context/NotesContext";

export function NotesArchived() {
  const { notes } = useNotes();

  //Filtrar las notas Archivadas
  const archivedNotes = notes.filter((note) => note.state === "note_archived");

  return (
    <>
      <Header title={"Notas Archivadas"} />
      <main className="w-full md:w-8/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 md:p-0 p-4 gap-3">
        {archivedNotes.map((note) => (
          <CardNote key={note.id} note={note} />
        ))}
      </main>
    </>
  );
}
