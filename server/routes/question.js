const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Question = require("../models/question");

const upload = multer({ dest: "uploads/" });
const router = express.Router();

// Subir archivo .txt
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf8");

    const questions = parseQuestions(fileContent);
    await Question.insertMany(questions);

    fs.unlinkSync(filePath);
    res.status(200).json({ message: "Preguntas cargadas exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error procesando el archivo", error });
  }
});

// Obtener todas las preguntas
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo preguntas", error });
  }
});

// Función para parsear preguntas del archivo
function parseQuestions(content) {
  const lines = content.split("\n");
  const questions = [];
  let question = null;

  lines.forEach((line) => {
    if (line.startsWith("¿")) {
      if (question) questions.push(question);
      question = {
        question: line.trim(),
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      };
    } else if (line.startsWith("A")) {
      question.option1 = line.substring(3).trim();
      console.log(question.option1);
    } else if (line.startsWith("B")) {
      question.option2 = line.substring(3).trim();
    } else if (line.startsWith("C")) {
      question.option3 = line.substring(3).trim();
    } else if (line.startsWith("D")) {
      question.option4 = line.substring(3).trim();
    } else if (line.startsWith("ANSWER:")) {
      question.answer = line.split(": ")[1].trim();
    }
  });

  if (question) questions.push(question);
  return questions;
}

module.exports = router;
