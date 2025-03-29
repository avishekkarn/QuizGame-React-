import React, { useState } from "react";
import "./Home.css";

const categories = [
  { name: "Computer Science", icon: "💻", questions: 10 },
  { name: "History", icon: "📜", questions: 10 },
  { name: "Marvel Universe", icon: "🎬", questions: 10 },
  { name: "Tech", icon: "🧪", questions: 10 },
  { name: "Sports", icon: "⚽", questions: 10 },
  { name: "Geo-Politics", icon: "🌐", questions: 10 },
  { name: "Biology", icon: "🦠", questions: 10 },
  { name: "Physics", icon: "⚛️", questions: 10 },
];

const Home = ({ setCategory }) => {
  const [showCategorySelection, setShowCategorySelection] = useState(false);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Challenge Your Knowledge!</h1>
        <p>Play fun quizzes across multiple categories. Are you ready?</p>
        <button 
          className="cta-button" 
          onClick={() => setShowCategorySelection(true)}
        >
          Start Playing
        </button>

        {/* Show category selection message when button is clicked */}
        {showCategorySelection && <p className="category-message">Select any category below</p>}
      </section>

      {/* IQ Test Special Section */}
      <section className="iq-test-container">
        <div className="iq-test-card" onClick={() => setCategory("IQ Test")}>
          <div className="iq-icon">🧠</div>
          <h2>IQ Test</h2>
          <p>Measure your intelligence with a specially designed IQ test!</p>
          <button className="iq-play-button">Take the Test</button>
        </div>
      </section>

      {/* Quiz Categories */}
      <section className="categories">
        <h2>Choose Your Quiz Category</h2>
        <div className="category-grid">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() => setCategory(cat.name)}
            >
              <span className="icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p>{cat.questions} Questions</p>
              <button className="play-button">Play</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>
          © 2025 QuizApp |{" "}
          <a 
            href="https://my-portfolio-avishek-karns-projects.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Avishek Karn
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
