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
      <main className="w-8/12 mx-auto grid grid-cols-3 gap-3">
        {archivedNotes.map((note) => (
          <CardNote key={note.id} note={note} />
        ))}
      </main>
    </>
  );
}
