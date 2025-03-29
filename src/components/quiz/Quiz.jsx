import React, { useRef, useState, useEffect } from "react";
import "./Quiz.css";

// Import different question sets
import { computerScienceQuestions } from "../../assets/computerScience";
import { historyQuestions } from "../../assets/history";
import { marvelQuestions } from "../../assets/marvelQuestions";
import { geoPoliticsQuestions } from "../../assets/geoPolitics";
import { sportsQuestions } from "../../assets/sports";
import { scienceQuestions } from "../../assets/tech";
import { biologyQuestions } from "../../assets/biology";
import { physicsQuestions } from "../../assets/physics";
import { iqQuestionSets } from "../../assets/iqQuestions"; // IQ Test Question Bank

const Quiz = ({ category, setCategory }) => {
  // State for questions
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  // IQ Test State Variables
  const [iqTestMode, setIqTestMode] = useState(null); // "take-test" or "calculate-iq"
  const [chronologicalAge, setChronologicalAge] = useState("");
  const [iqResult, setIqResult] = useState(null);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  let optionArray = [Option1, Option2, Option3, Option4];

  // Load questions for selected category
  useEffect(() => {
    if (category === "IQ Test") return;

    const getQuestions = () => {
      switch (category) {
        case "Computer Science":
          return computerScienceQuestions;
        case "Geo-Politics":
          return geoPoliticsQuestions;
        case "Marvel Universe":
          return marvelQuestions;
        case "Tech":
          return scienceQuestions;
        case "History":
          return historyQuestions;
        case "Sports":
          return sportsQuestions;
        case "Biology":
          return biologyQuestions;
        case "Physics":
          return physicsQuestions;
        default:
          return [];
      }
    };

    setQuestions(getQuestions());
    setIndex(0);
    setScore(0);
    setResult(false);
    setLock(false);
  }, [category]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (questions[index].ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        optionArray[questions[index].ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setLock(false);
      optionArray.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  // IQ Test Calculation
  const calculateIQ = () => {
    const age = parseFloat(chronologicalAge);
    const testScore = result ? score : parseFloat(score); // Use test score if available, otherwise use input
    const maxPossibleScore = 10;

    if (isNaN(age) || age < 3 || isNaN(testScore) || testScore < 0 || testScore > maxPossibleScore) {
        setIqResult("Invalid input. Please enter a valid age (3 or above) and score between 0-10.");
        return;
    }

    // Dynamic adjustment for mental age scaling
    const baseMentalAge = 6; // Starting mental age reference point
    const mentalAgeFactor = 1.5; // Adjustment factor for scaling across age groups

    // Calculate Mental Age dynamically
    const mentalAge = baseMentalAge + ((testScore / maxPossibleScore) * (age * mentalAgeFactor));

    // Calculate IQ Score dynamically
    const iqScore = Math.round((mentalAge / age) * 100);

    setIqResult(`Your estimated IQ score is: ${iqScore}`);
};


  // IQ Test Selection Screen
  if (category === "IQ Test" && !iqTestMode) {
    return (
      <div className="container">
        <h1>IQ Test</h1>
        <hr />
        <p>Select an option:</p>
        <button
          onClick={() => {
            setIqTestMode("take-test");
            const allQuestions = iqQuestionSets.flat(); // Flatten all sets into one
            const randomQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10); // Pick 10 random questions
            setQuestions(randomQuestions);
            setIndex(0);
            setScore(0);
            setResult(false);
          }}
        >
          Take IQ Test
        </button>
        <button onClick={() => setIqTestMode("calculate-iq")}>
          Directly Calculate IQ
        </button>
        <button onClick={() => setCategory(null)} className="home-button">
          Back to Home
        </button>
      </div>
    );
  }

  // IQ Test Questions (Fixed Format)
  if (category === "IQ Test" && iqTestMode === "take-test") {
    return (
      <div className="container">
        <h1>IQ Test</h1>
        <hr />
        {!result ? (
          <>
            <h2>{index + 1}. {questions[index]?.question}</h2>
            <ul>
              <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{questions[index]?.option1}</li>
              <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{questions[index]?.option2}</li>
              <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{questions[index]?.option3}</li>
              <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{questions[index]?.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">{index + 1} of {questions.length} questions</div>
          </>
        ) : (
          <>
            <h2>You Scored {score} out of {questions.length}</h2>
            <button onClick={reset}>Retake Test</button>
            <button onClick={() => setIqTestMode("calculate-iq")} className="calculate-button">
              Calculate IQ
            </button>
            <button onClick={() => setCategory(null)} className="home-button">Back to Home</button>
          </>
        )}
      </div>
    );
  }

  // IQ Score Calculation
  // IQ Score Calculation Section (Fix applied)
  if (category === "IQ Test" && iqTestMode === "calculate-iq") {
    return (
      <div className="container">
        <h1>IQ Calculation</h1>
        <hr />
        
        <div className="input-container">
          <label>Enter Your Age:</label>
          <input
            type="text"
            placeholder="e.g., 25"
            value={chronologicalAge}
            onChange={(e) => setChronologicalAge(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Enter Your Score (Out of 10):</label>
          <input
            type="text"
            placeholder="e.g., 7"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>

        <button className="calculate-button" onClick={calculateIQ}>
          Calculate IQ
        </button>

        {iqResult && <h2 className="iq-result">{iqResult}</h2>}

        <button onClick={() => setCategory(null)} className="home-button">
          Back to Home
        </button>
      </div>
    );
  }


  // Standard Quiz Sections
  return (
    <div className="container">
      <h1>{category} Quiz</h1>
      <hr />
      {!result ? (
        <>
          <h2>{index + 1}. {questions[index]?.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{questions[index]?.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{questions[index]?.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{questions[index]?.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{questions[index]?.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
        </>
      ) : (
        <>
          <h2>Quiz Completed!</h2>
          <h3>Your Score: {score} / {questions.length}</h3> {/* ✅ Score now displays */}
  
          {/* ✅ "Test My IQ" button */}
          <button 
            onClick={() => {
              setCategory("IQ Test");  // Redirect user to the IQ Test Section
              setIqTestMode("calculate-iq"); // Open IQ Calculation Section
            }}
          >
            Test My IQ
          </button>
  
          <button onClick={reset}>Retake Test</button>
          <button onClick={() => setCategory(null)} className="home-button">Back to Home</button>
        </>
      )}
    </div>
  );
  
  
};

export default Quiz;
