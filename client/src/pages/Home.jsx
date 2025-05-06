import React, { useContext } from 'react';
import { Container, Button, Row, Col, Card, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Home = ({ setShowLogin, setShowSignup }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isMobile = window.innerWidth < 578;

  // Banner styles using your tech6-min image
  const outerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh', // full viewport height
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundImage: "url('images/tech6-mi.webp')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  };

  const contentCenterStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%',
    textAlign: 'center',
    color: '#fff'
  };

  const sliderImages = [
    "images/tech6-mi.webp",
    "images/et1.webp",
    "images/et2.webp",
  ];

  // Invitation cards data (will trigger login modal on "Get Started")
  const invitationCards = [
    {
      title: 'General Course',
      description: 'Prepare to learn and test your knowledge on the fundamentals of aviation mathematics,physices and basic aerodynamics.',
      imgSrc: 'images/plane3.webp'
    },
    {
      title: 'Powerplant',
      description: 'Discover the world of aircraft engines—from piston to gas turbines.',
      imgSrc: 'images/engine.webp'
    },
    {
      title: 'Avionics',
      description: 'Test your knowledge on modern avionics including electrical systems and digital techniques.',
      imgSrc: 'images/av.webp'
    },
    {
      title: 'Airframe',
      description: 'Test your Understanding in aircraft structures, from design to assembly and rigging.',
      imgSrc: 'images/af.webp'
    }
  ];

  // courses and sub-courses mapping for authenticated users 
  const courses = [
    { code: "GC", name: "General Courses", description: "Test your knowledge across core aviation subjects: Mathematics, Physics, Aircraft Drawing, Aerodynamics, Materials, Workshop Practices, Avionics, Airframe and Powerplant Familiarization" },
    { code: "AV", name: "Avionics", description: "Includes Electrical Fundamentals, Electronics Fundamentals, Digital Techniques & Computers, Aircraft Electrical Systems, Communication & Navigation, and Instrument Systems." },
    { code: "AF", name: "Airframe", description: "Focuses on Aircraft Structure, Assembly, Rigging & Weight & Balance, Structural Materials & Repairs, Pneumatic & Hydraulic Systems, Landing Gear & Flight Controls, Fuel Systems, Cabin Environmental & Auxiliary Systems." },
    { code: "PP", name: "Powerplant", description: "Covers Engine Fundamentals, Gas Turbine Engine Systems, Aircraft Propeller Systems, and Engine Inspection & Maintenance." },
    { code: "ICAO", name: "ICAO", description: "Tests knowledge on international civil aviation regulations and standards." }
  ];

  const subCoursesMapping = {
    GC: ["GC001: Aviation Mathematics", "GC002: Aviation Physics", "GC003: Aircraft Drawing", "GC004: Basic Aerodynamics", "GC005: Aircraft Materials and Hardware", "GC006: Workshop Practices", "GC007: Avionics, Airframe & Powerplant Familiarization"],
    AV: ["AV001: Electrical Fundamentals", "AV002: Electronics Fundamentals", "AV003: Digital Techniques & Computers", "AV004: Aircraft Electrical System 1", "AV005: Aircraft Electrical System 2", "AV006: Communication & Navigation systems", "AV007: Aircraft instrument system"],
    AF: ["AF001: Aircraft Structure, Assembly, Rigging & Weight & Balance", "AF002: Structural Materials & Repairs", "AF003: Pneumatic & Hydraulic Systems", "AF004: Landing Gear & Flight Controls", "AF005: Fuel Systems", "AF006: Cabin Environmental system", "AF007: Auxiliary Systems"],
    PP: ["PP001: Engine Fundamentals", "PP002: Gas Turbine Engine Systems", "PP003: Aircraft Propeller Systems", "PP004: Engine Inspection & Maintenance."],
    ICAO: ["ICAO001: ICAO Regulation -Initial", "ICAO002: ET-CAA Regulation", "ICAO003: FAA Regulation"]
  };

  const cardStyle = {
    maxWidth: "600px",
    margin: "auto"
  };

  return (
    <>
      <Container fluid className='main-content' style={{ padding: 0, margin: 0, overflowX: 'hidden' }}>
        {!auth.user && (
          <>
            {/* Banner Section */}
            <div style={outerStyle}>
              <div style={overlayStyle}></div>
              <div style={contentCenterStyle}>
              <h1 className='display-3' > Welcome to Trainee Technicians-Hub</h1>
<p>
  Test your skills with questions on Avionics, Airframe, Powerplant and more. Learn as you go and enjoy the journey!
</p>


                <div style={{ margin: '20px 0' }}>
                  <Button className='button' variant="success" onClick={() => setShowLogin(true)} style={{ marginRight: '10px' }}>
                    Login
                  </Button>
                  <Button className='button' variant="primary" onClick={() => setShowSignup(true)}>
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Invitation Cards Section */}
            <Container fluid style={{ padding: '20px 0', overflowX: 'hidden' }}>
            <h2 className="text-center" style={{ margin: '30px' }}>Discover-Courses</h2>
            <hr />

              <Row className="g-4" style={{ justifyContent: "center" }}>
                {invitationCards.map((card, idx) => (
                  <Col key={idx} xs={12} sm={6} md={3} className="d-flex justify-content-center">
                    <Card style={{ width: '20rem' }}>
                      <Card.Img variant="top" src={card.imgSrc} alt={card.title} />
                      <Card.Body className="text-center">
                        <Card.Title>{card.title}</Card.Title>
                        <Card.Text>{card.description}</Card.Text>
                        <Button className='button' variant="primary" onClick={() => setShowSignup(true)}>
                          Get Started
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>

            {/* Slider Section - Placed below the cards with spacing */}
            <Container fluid style={{ padding: 0, margin: '10px 0 0px 0', overflowX: 'hidden' }}>
              <h2 className="text-center" style={{ marginBottom: '10px' }}>Featured</h2>
              <hr />
              <Carousel controls={false} indicators={true} fade interval={3000}>
                {sliderImages.map((src, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100"
                      src={src}
                      alt={`Slide ${idx + 1}`}
                      style={{ height: '400px', objectFit: isMobile ? 'contain' : 'cover' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Container>
          </>
        )}

        {auth.user && (
          <>
            <h2 className="text-center" style={{ marginTop: '7px' }}>Courses</h2>
            <hr />
            <Container fluid className="main-content" style={{ overflowX: 'hidden' }}>
              <Row className="g-4" style={{ justifyContent: "center" }}>
                {courses.map((c) => (
                  <Col xs={12} md={6} key={c.code} className="d-flex justify-content-center">
                    <Card style={cardStyle}>
                      <Card.Body>
                        <Card.Title>{c.code} - {c.name}</Card.Title>
                        <div>
                          <strong>Questions available on:</strong>
                          <ul>
                            {(subCoursesMapping[c.code] || []).map((sub, idx) => (
                              <li key={idx}>{sub}</li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "10px" }}>
                          <Button
                            variant="success"
                            onClick={() => {
                              navigate(`/courses/${c.code}`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                          >
                            View Questions
                          </Button>
                        </div>
                      </Card.Body>
                      <Card.Footer style={{ backgroundColor: "#f8f9fa" }}>
                        <small>{c.description}</small>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row className="g-4" style={{ marginTop: "20px" }}>
                <Col>
                  <Card style={{ maxWidth: '500px', margin: 'auto' }} className="resource-card">
                    <Card.Body>
                      <Card.Title>Get Course Resources</Card.Title>
                      <Card.Text>
                        Access your course PDFs and other resources.
                      </Card.Text>
                      <Button variant="info" onClick={() => navigate('/resources')}>
                        View Resources
                      </Button>
                    </Card.Body>
                    <Card.Footer style={{ backgroundColor: '#f8f9fa' }}>
                      <small>Download and study at your pace!</small>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </Container>

      {/* Sticky Footer */}
      <footer style={{
        bottom: 0,
        width: '100%',
        // backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color: '#000',
        textAlign: 'center',
        padding: '10px 0',
        marginBootom: 0,
      }}>
        <small>&copy; {new Date().getFullYear()} Made with 💖 by Jr</small>
      </footer>
    </>
  );
};

export default Home;
