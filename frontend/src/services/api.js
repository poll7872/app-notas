import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllNotes = async () => {
  try {
    const response = await apiClient.get("/notes/getAllNotes");
    return response.data.notes;
  } catch (error) {
    console.error("Error fetching notes: ", error);
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await apiClient.post("/notes/createNote", note);
    return response.data.note;
  } catch (error) {
    console.error("Error creating note", error);
    throw error;
  }
};

export const updateNote = async (id, updatedNote) => {
  try {
    const response = await apiClient.put(
      `/notes/updateNote/${id}`,
      updatedNote,
    );
    return response.data.noteWithCategories;
  } catch (error) {
    console.error("Error updating note ", Error);
    throw error;
  }
};

export const archiveNote = async (id, newState) => {
  try {
    const response = await apiClient.put(`/notes/archiveNote/${id}`, {
      state: newState,
    });
    return response.data.stateUpdated;
  } catch (error) {
    console.error("Error updating state of the note ", Error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await apiClient.delete(`/notes/deleteNote/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting note ", Error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get("/categories/getCategories");
    return response.data.categories;
  } catch (error) {
    console.error("Error getting categories: ", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await apiClient.post(
      "/categories/createCategory",
      category,
    );
    return response.data.category;
  } catch (error) {
    console.error("Error created category");
    throw error;
  }
};
