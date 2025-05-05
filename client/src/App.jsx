import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComp from './components/NavbarComp';
import Home from './pages/Home';
import CourseList from './pages/CourseList';
import QuizPage from './pages/QuizPage';
import Resources from './pages/Resources';  // New page for resources
import PrivateRoute from './components/PrivateRoute';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

function App() {
  // const [initialLoading, setInitialLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);
 // quizStatus holds { givenTime, remainingTime, answered, total } from QuizPage
 const [quizStatus, setQuizStatus] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // if (initialLoading) {
  //   return (
  //     <div style={{ textAlign: 'center', marginTop: '20%' }}>
  //       <h2>Loading...</h2>
  //     </div>
  //   );
  

    // Callback to collapse the Navbar toggler (set expanded to false)
    const collapseNav = () => {
      setNavExpanded(false);}

  // Set main-content top padding: 60px (collapsed) or 120px (expanded).
  const mainContentPadding = navExpanded ? "120px" : "60px";

  return (
    <Router>
      <NavbarComp 
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        navExpanded={navExpanded}
        setNavExpanded={setNavExpanded}
        quizStatus={quizStatus}
      />
      <div className="main-content" style={{ paddingTop: mainContentPadding, transition: "padding-top 0.5s ease" }}>
      <Routes>
          <Route path="/" element={<Home setShowLogin={setShowLogin} setShowSignup={setShowSignup} />} />
          <Route path="/courses/:category" element={<CourseList />} />
          <Route path="/quiz/:category/:subNum" element={<QuizPage setQuizStatus={setQuizStatus} />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
      <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} />
    </Router>
  );
}

export default App;
