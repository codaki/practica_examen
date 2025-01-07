import React from "react";
import FileUpload from "./components/FileUpload";
import QuestionList from "./components/QuestionList";

const App = () => {
  return (
    <div>
      <h1>Simulador de Pruebas</h1>
      <FileUpload />
      <QuestionList />
    </div>
  );
};

export default App;
