import { Note } from "../models/Note.js";
import { Category } from "../models/Category.js";

//Función para crear una nota
export const createNote = async (req, res) => {
  const { title, content, state, categoryIds } = req.body;

  try {
    //1. Crear la nota
    const newNote = await Note.create({
      title,
      content,
      state,
    });

    //2. Asociar las categorias con la nota
    if (categoryIds.length > 0) {
      const categories = await Category.findAll({
        where: {
          id: categoryIds,
        },
      });

      await newNote.addCategories(categories);
    }

    //3. Devolver la nota con sus respectivas categorias
    const noteWithCategories = await Note.findOne({
      where: { id: newNote.id },
      include: {
        model: Category,
        through: {
          attributes: [],
        },
      },
    });

    return res.status(201).json({
      message: "Successfully created note",
      note: noteWithCategories,
    });
  } catch (error) {
    console.log("Error creating note");
    return res.status(500).json({
      message: "Error creating note",
      error: error.message,
    });
  }
};

//Función para obtener todas las notas
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: { model: Category, through: { attributes: [] } },
    });
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting notes",
      error: error.message,
    });
  }
};

//Función para obtener una nota por su id
export const getNoteById = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findOne({
      where: {
        id: noteId,
      },
      include: {
        model: Category,
        through: {
          attributes: [],
        },
      },
    });

    //Validar que la nota exista
    if (!note) {
      return res.status(404).json({
        message: `Note with ID ${noteId} not found`,
      });
    }

    return res.status(200).json({ note });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting note",
      error: error.message,
    });
  }
};

//Función para editar una nota
export const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, content, state, categoryIds } = req.body;

  try {
    const [rowsUpdated] = await Note.update(
      {
        title: title,
        content: content,
        state: state,
      },
      {
        where: {
          id: noteId,
        },
      },
    );

    //Validar si no se modifico ninguna fila
    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: `Note with ID: ${noteId} not found` });
    }

    //obtener la nueva nota actualizas
    const noteUpdated = await Note.findOne({
      where: {
        id: noteId,
      },
    });

    //Si hay categorias actualizarlas.
    if (categoryIds.length > 0) {
      const categories = await Category.findAll({
        where: {
          id: categoryIds,
        },
      });

      await noteUpdated.setCategories(categories);
    }

    //Obtener la nota con las categorias
    const noteWithCategories = await Note.findOne({
      where: { id: noteId },
      include: {
        model: Category,
        through: {
          attributes: [],
        },
      },
    });

    return res.status(200).json({ noteWithCategories });
  } catch (error) {
    return res.status(500).json({
      message: "Error updated note",
      error: error.message,
    });
  }
};

//Función para archivar una nota
export const archiveNote = async (req, res) => {
  const noteId = req.params.id;
  const { state } = req.body;

  try {
    const rowUpdated = await Note.update(
      { state: state },
      { where: { id: noteId } },
    );

    //Comprobar si no se modifico la fila state
    if (rowUpdated === 0) {
      return res
        .status(404)
        .json({ message: `Note with ID: ${noteId} not found` });
    }

    //Obtener la nueva nota con el state actualizado
    const stateUpdated = await Note.findOne({
      where: {
        id: noteId,
      },
    });

    return res.status(200).json({ stateUpdated });
  } catch (error) {
    return res.status(500).json({
      message: "Error updated state of the note",
      error: error.message,
    });
  }
};

//Función para eliminar una nota
export const deleteNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    //Comprobar que la nota existe
    const note = await Note.findOne({ where: { id: noteId } });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note with ID: ${noteId} not found" });
    }

    //ELiminar las asociaciones de la tabla note con note_categories
    await note.setCategories([]);

    await Note.destroy({
      where: { id: noteId },
    });

    return res.status(200).json({ message: "Successfully deleted note" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting note",
      error: error.message,
    });
  }
};
