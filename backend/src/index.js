import app from "./app.js";
import { sequelize } from "./config/db.js";
import dotenv from "dotenv";
import { Note, Category } from "./models/associations.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    //Conexion con la BD
    await sequelize.authenticate();
    console.log("Connection with DB stablished");

    //Sincronizar los modelos
    await sequelize.sync();
  } catch (error) {
    console.log("DB not connected", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running in: http://localhost:${PORT}`);
  });
};

startServer();
