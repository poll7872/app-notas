import { Category } from "../models/Category.js";

//Función para obtener todas las categorias
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting categories",
      error: error.message,
    });
  }
};

//Función para crear categoria
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    return res.status(201).json({
      message: "Successfully created category",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating category",
      error: error.message,
    });
  }
};

//Función para actualizar una nota
export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    const category = await Category.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({
        message: `Category with ID: ${categoryId} not found`,
      });
    }

    await Category.update(
      { name: name },
      {
        where: { id: categoryId },
      },
    );

    const updatedCategory = await Category.findOne({
      where: { id: categoryId },
    });

    return res.status(200).json({
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updated category",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findOne({ where: { id: categoryId } });

    if (!category) {
      return res
        .status(404)
        .json({ message: `Category with ID: ${categoryId} not found` });
    }

    await category.setNotes([]);
    await Category.destroy({ where: { id: categoryId } });

    return res.status(200).json({ message: "Successfully deleted category" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting category",
      error: error.message,
    });
  }
};
