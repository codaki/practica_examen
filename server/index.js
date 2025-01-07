const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const questionRoutes = require("./routes/question");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use("/api/questions", questionRoutes);

// Conexión a MongoDB
mongoose
  .connect(
    "mongodb+srv://simulador:simulador@meritos.oco5env.mongodb.net/?retryWrites=true&w=majority&appName=Meritos"
  )
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.error("Error conectando a la base de datos", err);
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
