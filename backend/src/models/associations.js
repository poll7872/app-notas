import { Category } from "./Category.js";
import { Note } from "./Note.js";

//Establecer la relacion muchos a muchos con category
Note.belongsToMany(Category, {
  through: "note_categories",
  foreignKey: "note_id",
  timestamps: false,
});

Category.belongsToMany(Note, {
  through: "note_categories",
  foreignKey: "category_id",
  timestamps: false,
});

export { Note, Category };
