import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyNotes } from "../pages/MyNotes";
import { NotesArchived } from "../pages/NotesArchived";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyNotes />} />
        <Route path="/notas-archivadas" element={<NotesArchived />} />
      </Routes>
    </Router>
  );
}
