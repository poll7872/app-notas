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
