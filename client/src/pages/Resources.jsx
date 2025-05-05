import React from 'react';
import { Container, Accordion, Button, ListGroup } from 'react-bootstrap';

const Resources = () => {
  // Dummy resource data grouped by main course and then sub-course.
  const resourceData = {
    GC: {
      "GC001": [
        { id: 1, title: "GC001 Study Guide", type: "PDF", url: "/resources/gc001-study-guide.pdf" },
        { id: 2, title: "GC001 Slides", type: "PPT", url: "/resources/gc001-slides.ppt" }
      ],
      "GC002": [
        { id: 3, title: "GC002 Study Material", type: "PDF", url: "/resources/gc002-study.pdf" }
      ],
      // Add resources for other GC sub-courses…
      "GC003": [],
      "GC004": [],
      "GC005": [],
      "GC006": [],
      "GC007": []
    },
    AF: {
      "AF001": [
        { id: 4, title: "AF001 Manual", type: "PDF", url: "/resources/af001-manual.pdf" }
      ],
      "AF002": [
        { id: 5, title: "AF002 Repair Guide", type: "PDF", url: "/resources/af002-repair.pdf" }
      ],
      // Add remaining AF sub-courses’ resources...
      "AF003": [],
      "AF004": [],
      "AF005": [],
      "AF006": [],
      "AF007": []
    },
    AV: {
      "AV001": [
        { id: 6, title: "AV001 Electrical Fundamentals", type: "PDF", url: "/resources/av001-electrical.pdf" }
      ],
      "AV002": [
        { id: 7, title: "AV002 Electronics Fundamentals", type: "PDF", url: "/resources/av002-electronics.pdf" }
      ],
      "AV003": [
        { id: 8, title: "AV003 Digital Techniques", type: "PPT", url: "/resources/av003-digital.ppt" }
      ],
      "AV004": [],
      "AV005": [],
      "AV006": [],
      "AV007": []
    },
    PP: {
      "PP001": [
        { id: 9, title: "PP001 Engine Fundamentals", type: "PDF", url: "/resources/pp001-engine.pdf" }
      ],
      "PP002": [
        { id: 10, title: "PP002 Gas Turbine Systems", type: "PDF", url: "/resources/pp002-gas-turbine.pdf" }
      ],
      "PP003": [
        { id: 11, title: "PP003 Propeller Systems", type: "PPT", url: "/resources/pp003-propeller.ppt" }
      ],
      "PP004": []
    },
    ICAO: {
      "ICAO001": [
        { id: 12, title: "ICAO001 Regulation - Initial", type: "PDF", url: "/resources/icao001-regulation.pdf" }
      ],
      "ICAO002": [
        { id: 13, title: "ICAO002 ET-CAA Regulation", type: "PDF", url: "/resources/icao002-et-caa.pdf" }
      ],
      "ICAO003": [
        { id: 14, title: "ICAO003 FAA Regulation", type: "PPT", url: "/resources/icao003-faa.ppt" }
      ]
    }
  };

  return (
    <Container fluid className="main-content">
      <h2 className="text-center" style={{ marginTop: "20px" }}>Course Resources</h2>
      <Accordion defaultActiveKey="0">
        {Object.entries(resourceData).map(([course, subs], courseIndex) => (
          <Accordion.Item key={course} eventKey={courseIndex.toString()}>
            <Accordion.Header>{course}</Accordion.Header>
            <Accordion.Body>
              <Accordion>
                {Object.entries(subs).map(([subCourse, resources], subIndex) => (
                  <Accordion.Item key={subCourse} eventKey={subIndex.toString()}>
                    <Accordion.Header>{subCourse}</Accordion.Header>
                    <Accordion.Body>
                      {resources.length ? (
                        <ListGroup variant="flush">
                          {resources.map((res) => (
                            <ListGroup.Item key={res.id} className="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>{res.title}</strong> ({res.type})
                              </div>
                              <div>
                                <Button variant="link" href={res.url} target="_blank" rel="noopener noreferrer">
                                  View
                                </Button>
                                <Button variant="link" href={res.url} download style={{ marginLeft: "10px" }}>
                                  Download
                                </Button>
                              </div>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      ) : (
                        <p>No resources available.</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default Resources;
