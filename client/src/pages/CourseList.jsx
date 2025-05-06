import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const CourseList = ({ collapseNav }) => {
  const { category } = useParams();
  const navigate = useNavigate();

  // New sub-courses details for each main course.
  const subCoursesMapping = {
    GC: [
      { subNum: "GC001", quizTime: "60 min", Numberofquestions: "20", topics: ["Aviation Mathematics"] },
      { subNum: "GC002", quizTime: "60 min", Numberofquestions: "20", topics: ["Aviation Physics"] },
      { subNum: "GC003", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Drawing"] },
      { subNum: "GC004", quizTime: "60 min", Numberofquestions: "20", topics: ["Basic Aerodynamics"] },
      { subNum: "GC005", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Materials and Hardware"] },
      { subNum: "GC006", quizTime: "60 min", Numberofquestions: "20", topics: ["Workshop Practices"] },
      { subNum: "GC007", quizTime: "60 min",  Numberofquestions: "20", topics: ["Avionics, Airframe and Powerplant Familiarization"] },
      { subNum: ": GC Final", quizTime: "2hr", Numberofquestions: "50", topics: ["General Courses"] }

    ],
    AV: [
      { subNum: "AV001", quizTime: "60 min", Numberofquestions: "20", topics: ["Electrical Fundamentals"] },
      { subNum: "AV002", quizTime: "60 min", Numberofquestions: "20", topics: ["Electronics Fundamentals"] },
      { subNum: "AV003", quizTime: "60 min", Numberofquestions: "20", topics: ["Digital Techniques and Computers"] },
      { subNum: "AV004", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Electrical Systems 1"] },
      { subNum: "AV005", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Electrical Systems 2"] },
      { subNum: "AV006", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Communication and Navigation System"] },
      { subNum: "AV007", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Instrument Systems"] },
      { subNum: "Avionics Final", quizTime: "2hr", Numberofquestions: "50", topics: ["Avionics Courses"] }

    ],
    AF: [
      { subNum: "AF001", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Structure, Assembly, Rigging and Weight & Balance"] },
      { subNum: "AF002", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Structural Materials and Repairs"] },
      { subNum: "AF003", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Pneumatic and Hydraulic Systems"] },
      { subNum: "AF004", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Landing Gear and Flight Control Systems"] },
      { subNum: "AF005", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Fuel System"] },
      { subNum: "AF006", quizTime: "60 min", Numberofquestions: "20", topics: ["Cabin Environmental System"] },
      { subNum: "AF007", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Auxiliary System"] },
      { subNum: "Airframe-Final:", quizTime: "2hr", Numberofquestions: "50", topics: ["Airframe Courses"] }

    ],
    PP: [
      { subNum: "PP001", quizTime: "60 min", Numberofquestions: "20", topics: ["Engine Fundamentals"] },
      { subNum: "PP002", quizTime: "60 min", Numberofquestions: "20", topics: ["Gas Turbine Engine Systems"] },
      { subNum: "PP003", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Propeller Systems"] },
      { subNum: "PP004", quizTime: "60 min", Numberofquestions: "20", topics: ["Aircraft Engine Inspection & Maintenance"] },
      { subNum: "Power plant-Final:", quizTime: "2hr", Numberofquestions: "50", topics: ["Powerplant Courses"] }

    ],
    ICAO: [
      { subNum: "ICAO001", quizTime: "60 min", Numberofquestions: "20", topics: ["ICAO Regulation - Initial"] },
      { subNum: "ICAO002", quizTime: "60 min", Numberofquestions: "20", topics: ["ET-CAA Regulation"] },
      { subNum: "ICAO003", quizTime: "60 min", Numberofquestions: "20", topics: ["FAA Regulation"] }
    ]
  };

  const subCourses = subCoursesMapping[category] || [];

  return (
    <Container fluid className="main-content">
      <h2 className="text-center" style={{ marginTop: "20px"}}>{category} Courses</h2>
      <hr  />
      <Row className="g-4" style={{ marginTop: "20px" }}>
        {subCourses.map((item) => (
          <Col xs={12} md={6} key={item.subNum}>
            <Card style={{ maxWidth: "600px", margin: "auto" }}>
              <Card.Body>
                <Card.Title>{category} - {item.subNum}</Card.Title>
                <Card.Text>
                Number of questions: {item.Numberofquestions}
                                                 <br />
                Time Given: {item.quizTime} 

                </Card.Text>
                {/* <Card.Text>
                Number of questions: {item.Numberofquestions}
                </Card.Text> */}
                <Card.Text as="div">
                  <strong>Topics:</strong>
                  <ul>
                    {item.topics.map((topic, idx) => (
                      <li key={idx}>{topic}</li>
                    ))}
                  </ul>
                </Card.Text>
                <div style={{  marginTop: "10px" }}>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      if(collapseNav) collapseNav();
                      navigate(`/quiz/${category}/${item.subNum}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Start Quiz
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CourseList;
