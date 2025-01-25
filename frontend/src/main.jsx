import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NotesProvider } from "./context/NotesContext.jsx";
import { CategoriesProvider } from "./context/CategoriesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotesProvider>
      <CategoriesProvider>
        <App />
      </CategoriesProvider>
    </NotesProvider>
  </StrictMode>,
);
