import { Sequelize } from "sequelize";
import { sequelize } from "../config/db.js";

export const NoteCategory = sequelize.define(
  "note_categories",
  {
    note_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "notes",
        key: "id",
      },
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
  },
  {
    timestamps: false, // Deshabilitar la gestión de createdAt y updatedAt
  },
);
