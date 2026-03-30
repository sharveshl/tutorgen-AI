import { useState } from "react";

const questions = [
  { q: "2 + 2 = ?", answer: "4" },
  { q: "5 * 3 = ?", answer: "15" },
  { q: "10 / 2 = ?", answer: "5" },
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const submitQuiz = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(correct);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-3">📘 Quiz</h2>

      {questions.map((q, i) => (
        <div key={i} className="mb-3">
          <p>{q.q}</p>
          <input
            className="w-full p-2 mt-1 text-black rounded"
            onChange={(e) => handleChange(i, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={submitQuiz}
        className="bg-blue-500 px-4 py-2 rounded mt-3"
      >
        Submit
      </button>

      {score !== null && (
        <p className="mt-3 text-green-400">Score: {score}/3</p>
      )}
    </div>
  );
};

export default Quiz;