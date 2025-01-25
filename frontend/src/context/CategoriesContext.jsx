import { createContext, useContext, useState, useEffect } from "react";
import { getCategories } from "../services/api";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log("Error al obtener las categorias: ", error);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  return (
    <CategoriesContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
