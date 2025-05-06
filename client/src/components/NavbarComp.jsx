import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const NavbarComp = ({ setShowLogin, setShowSignup, navExpanded, setNavExpanded, quizStatus }) => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isQuizPage = location.pathname.startsWith("/quiz");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 578);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 578);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    if (!isQuizPage) {
      const newState = !expanded;
      setExpanded(newState);
      setNavExpanded(newState);
    }
  };

  const handleBack = () => {
    setExpanded(false);
    setNavExpanded(false);
    navigate(-1);
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  const handleLogout = () => {
    logout();
    setExpanded(false);
    setNavExpanded(false);
    navigate('/');
  };

  return (
    <Navbar expanded={expanded} expand="lg" fixed="top" className="navbar-white">
      <Container fluid>
        <Navbar.Brand>
          {isHome ? (
            <>
              <img src="images/logo.svg" alt="logo" width="40" height="40" style={{ marginLeft: '15px' }} />
              <span style={{ marginLeft: '15px', marginTop: "500px" }}></span>
            </>
          ) : (
            <Button
              variant="link"
              className="accordion-button"
              onClick={handleBack}
              style={{
                color: "green",
                fontSize: "0.9rem",
                padding: "0",
                textDecoration: "none",
                fontWeight: "bold",
                marginLeft: "8px"
              }}
            >
          ←     
          </Button>
          )}
        </Navbar.Brand>
        {!isQuizPage && <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />}
        <Navbar.Collapse id="responsive-navbar-nav">
          {auth.user ? (
            <Nav className={isMobile ? "w-100 justify-content-center" : "ms-auto"}>
              {isQuizPage && quizStatus && (
                <div style={{ marginRight: "20px", textAlign: "right", fontSize: "0.8rem" }}>
                  <div>Given: {quizStatus.givenTime}s</div>
                  <div>Remaining: {formatTime(quizStatus.remainingTime)}</div>
                  <div>Progress: {quizStatus.answered} / {quizStatus.total}</div>
                </div>
              )}
              {isMobile ? (
                <div className="d-flex flex-column align-items-center">
                  <div style={{ fontWeight: "bold", fontSize: "0.8rem", marginBottom: "5px", display: "flex", alignItems: "center" }}>
                    <span style={{ color: "green", marginRight:"4px" }}>👤</span>{auth.user}
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={handleLogout} style={{ maxWidth: "60px", padding: "0.2rem 0.4rem" }}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <div style={{ display: "flex", alignItems: "center", marginRight: "10px", fontWeight: "bold", fontSize: "0.8rem" }}>
                    <span style={{ color: "green", marginRight: "5px" }}>👤</span>{auth.user}
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
            </Nav>
          ) : (
            <Nav className={isMobile ? "w-100 justify-content-center" : "ms-auto"}>
              <Button className='button' variant={isMobile ? "link" : "outline-success"} size="sm" onClick={() => {
                setShowLogin(true);
                setExpanded(false);
                setNavExpanded(false);
              }} style={{ marginRight: isMobile ? "0" : "10px", marginBottom: isMobile ? "10px" : "0" }}>
                Login
              </Button>
              <Button className='button' variant={isMobile ? "link" : "outline-primary"} size="sm" onClick={() => {
                setShowSignup(true);
                setExpanded(false);
                setNavExpanded(false);
              }}>
                Sign Up
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
