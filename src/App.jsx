// import { useEffect, useState } from "react";
// import Button from "./components/ui/button";
// import Card from "./components/ui/card";
// import CardContent from "./components/ui/cardContent";
// import { openDB } from "idb";
// import questions from "./data/questions";
// import "./App.css";

// // Initialize the database with IndexedDB 3.0
// const initDB = async () => {
//   const db = await openDB("QuizDB", 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains("history")) {
//         db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
//       }
//     },
//   });
//   return db;
// };

// // Save history to IndexedDB
// const saveHistoryToDB = async (history) => {
//   const db = await initDB();
//   const tx = db.transaction("history", "readwrite");
//   const store = tx.objectStore("history");
//   await store.add({ timestamp: Date.now(), history });
//   await tx.done;
// };

// function useTimer(initialTime, onTimeout, isQuizFinished) {
//   const [timeLeft, setTimeLeft] = useState(initialTime);

//   useEffect(() => {
//     if (isQuizFinished) {
//       return; // Do nothing if the quiz is finished
//     }

//     if (timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer); // Cleanup on re-render
//     } else {
//       onTimeout();
//     }
//   }, [timeLeft, onTimeout, isQuizFinished]);

//   return [timeLeft, setTimeLeft];
// }

// function App() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [feedback, setFeedback] = useState(null);
//   const [score, setScore] = useState(0);
//   const [history, setHistory] = useState([]);
//   const [quizFinished, setQuizFinished] = useState(false);

//   const handleNext = async () => {
//     // Only allow proceeding if the answer is selected or entered
//     if (selectedAnswer === null || selectedAnswer === "") {
//       return;
//     }

//     const updatedHistory = [
//       ...history,
//       {
//         question: questions[currentQuestion].question,
//         answer: selectedAnswer,
//       },
//     ];
//     setHistory(updatedHistory);

//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedAnswer(null); // Now we reset it here for the next question
//       setFeedback(null);
//       setTimeLeft(30); // Reset timer for the next question
//     } else {
//       setQuizFinished(true);
//       await saveHistoryToDB(updatedHistory); // Save history to DB when quiz finishes
//     }
//   };
//   const [timeLeft, setTimeLeft] = useTimer(30, handleNext, quizFinished);

//   const handleAnswer = (selectedOption) => {
//     let isCorrect = false;

//     if (questions[currentQuestion].type === "multiple-choice") {
//       setSelectedAnswer(selectedOption);
//       // Convert the letter (e.g., "B") to an index (1)
//       const correctIndex =
//         questions[currentQuestion].answer.charCodeAt(0) - "A".charCodeAt(0);
//       // Compare the selected option text with the correct option text
//       isCorrect =
//         selectedOption === questions[currentQuestion].options[correctIndex];
//     } else if (questions[currentQuestion].type === "integer") {
//       // Compare integer values for integer-type questions
//       setSelectedAnswer(selectedOption);

//       isCorrect =
//         parseInt(selectedOption) === questions[currentQuestion].answer;
//     }

//     if (isCorrect) {
//       setFeedback("Correct!");
//       setScore(score + 1);
//     } else {
//       setFeedback("Wrong answer.");
//     }
//   };

//   const handleRestart = () => {
//     setCurrentQuestion(0);
//     setScore(0);
//     setHistory([]);
//     setTimeLeft(30);
//     setQuizFinished(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       {!quizFinished ? (
//         <Card className="w-full max-w-md p-4 shadow-lg rounded-2xl bg-white">
//           <CardContent>
//             <h2 className="text-xl font-bold mb-2">
//               {questions[currentQuestion].question}
//             </h2>
//             <div className="grid gap-2">
//               {questions[currentQuestion].type === "multiple-choice" ? (
//                 <div className="grid gap-2">
//                   {questions[currentQuestion].options.map((option, index) => (
//                     <Button
//                       key={index}
//                       onClick={() => handleAnswer(option)} // Pass the option text (e.g., "Venus", "Mercury")
//                       className="w-full"
//                     >
//                       {option}
//                     </Button>
//                   ))}
//                 </div>
//               ) : (
//                 <input
//                   type="number"
//                   value={selectedAnswer}
//                   onChange={(e) => handleAnswer(e.target.value)} // Ensure it's a number input
//                   placeholder="Enter your answer"
//                   className="w-full p-2 border border-gray-300 rounded"
//                 />
//               )}
//             </div>
//             {feedback && <p className="mt-2 font-semibold">{feedback}</p>}
//             <p className="text-gray-500 mt-2">Time left: {timeLeft}s</p>
//             <Button
//               onClick={handleNext}
//               className="mt-4 w-full"
//               disabled={!selectedAnswer}
//             >
//               Next
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-2xl text-center">
//           <h3 className="text-lg font-bold mb-2">Quiz Finished!</h3>
//           <p>
//             Your Score: {score}/{questions.length}
//           </p>
//           <h3 className="text-lg font-bold mt-4 mb-2">Attempt History</h3>
//           <ul>
//             {history.map((attempt, index) => (
//               <li key={index} className="text-gray-700">
//                 {attempt.question} - Your Answer: {attempt.answer}
//               </li>
//             ))}
//           </ul>
//           <Button onClick={handleRestart} className="mt-4 w-full">
//             Restart Quiz
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import Button from "./components/ui/button";
import Card from "./components/ui/card";
import CardContent from "./components/ui/cardContent";
import { openDB } from "idb";
import questions from "./data/questions";
import "./App.css";

// Initialize the database with IndexedDB 3.0
const initDB = async () => {
  const db = await openDB("QuizDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("history")) {
        db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
      }
    },
  });
  return db;
};

// Save history to IndexedDB
const saveHistoryToDB = async (history) => {
  const db = await initDB();
  const tx = db.transaction("history", "readwrite");
  const store = tx.objectStore("history");
  await store.add({ timestamp: Date.now(), history });
  await tx.done;
};

function useTimer(initialTime, onTimeout, isQuizFinished) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (isQuizFinished) {
      return; // Do nothing if the quiz is finished
    }

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Cleanup on re-render
    } else {
      onTimeout();
    }
  }, [timeLeft, onTimeout, isQuizFinished]);

  return [timeLeft, setTimeLeft];
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // For integer questions, we store the answer as a string.
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  // When the timer expires, call handleNext in forced mode.
  const [timeLeft, setTimeLeft] = useTimer(
    30,
    () => handleNext(true),
    quizFinished
  );

  // When an answer is chosen, update selectedAnswer and set feedback/score.
  const handleAnswer = (selectedOption) => {
    // Update the answer state (works for both multiple-choice and integer)
    setSelectedAnswer(selectedOption);

    let isCorrect = false;

    if (questions[currentQuestion].type === "multiple-choice") {
      // Convert the correct answer letter (e.g., "B") to an index (1)
      const correctIndex =
        questions[currentQuestion].answer.charCodeAt(0) - "A".charCodeAt(0);
      // Compare the selected option text with the correct option text
      isCorrect =
        selectedOption === questions[currentQuestion].options[correctIndex];
    } else if (questions[currentQuestion].type === "integer") {
      isCorrect =
        parseInt(selectedOption) === questions[currentQuestion].answer;
    }

    if (isCorrect) {
      setFeedback("Correct!");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("Wrong answer.");
    }
  };

  // The handleNext function now accepts a forced parameter.
  // If forced is true (timer expired), we ignore any answer (and remove any score that might have been added).
  const handleNext = async (forced = false) => {
    // If forced skip, override the answer.
    const answerToRecord = forced ? "" : selectedAnswer;

    // If not forced and no answer is provided, do nothing.
    if (!forced && (selectedAnswer === null || selectedAnswer === "")) {
      return;
    }

    // If forced skip and the current feedback indicates a correct answer, subtract that point.
    if (forced && feedback === "Correct!") {
      setScore((prev) => prev - 1);
      setFeedback("Time's up!");
    }

    const updatedHistory = [
      ...history,
      {
        question: questions[currentQuestion].question,
        answer: answerToRecord,
      },
    ];
    setHistory(updatedHistory);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(""); // Clear answer (this clears integer input)
      setFeedback(null);
      setTimeLeft(30); // Reset timer for the next question
    } else {
      setQuizFinished(true);
      await saveHistoryToDB(updatedHistory);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setHistory([]);
    setSelectedAnswer("");
    setTimeLeft(30);
    setQuizFinished(false);
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!quizFinished ? (
        <Card className="w-full max-w-md p-4 shadow-lg rounded-2xl bg-white">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">
              {questions[currentQuestion].question}
            </h2>
            <div className="grid gap-2">
              {questions[currentQuestion].type === "multiple-choice" ? (
                <div className="grid gap-2">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <input
                  type="number"
                  value={selectedAnswer}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Enter your answer"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
            </div>
            {feedback && <p className="mt-2 font-semibold">{feedback}</p>}
            <p className="text-gray-500 mt-2">Time left: {timeLeft}s</p>
            <Button
              onClick={() => handleNext()}
              className="mt-4 w-full"
              // Next is enabled if an answer exists (including "0")
              disabled={selectedAnswer === "" && selectedAnswer !== "0"}
            >
              Next
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-2xl text-center">
          <h3 className="text-lg font-bold mb-2">Quiz Finished!</h3>
          <p>
            Your Score: {score}/{questions.length}
          </p>
          <h3 className="text-lg font-bold mt-4 mb-2">Attempt History</h3>
          <ul>
            {history.map((attempt, index) => (
              <li key={index} className="text-gray-700">
                {attempt.question} - Your Answer: {attempt.answer}
              </li>
            ))}
          </ul>
          <Button onClick={handleRestart} className="mt-4 w-full">
            Restart Quiz
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
