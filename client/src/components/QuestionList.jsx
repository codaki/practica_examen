import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../api";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetchQuestions();
      setQuestions(response.data);
    };

    getQuestions();
  }, []);

  return (
    <div>
      <h2>Preguntas</h2>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <p>{q.question}</p>
            <ul>
              <li>{q.option1}</li>
              <li>{q.option2}</li>
              <li>{q.option3}</li>
              <li>{q.option4}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
