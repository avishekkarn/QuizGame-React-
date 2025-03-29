import React, { useState } from "react";
import Home from "./components/quiz/Home";
import Quiz from "./components/quiz/Quiz";
import "./App.css";

function App() {
  const [category, setCategory] = useState(null);

  return (
    <div className="App">
      {category ? <Quiz category={category} setCategory={setCategory} /> : <Home setCategory={setCategory} />}
    </div>
  );
}

export default App;
