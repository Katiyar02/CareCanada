import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeartbeat, faFire, faBone, faLungs, faTint, faBolt } from "@fortawesome/free-solid-svg-icons";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const FirstAid = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "CPR & Resuscitation", icon: faHeartbeat },
    { name: "Burns & Scalds", icon: faFire },
    { name: "Fractures & Sprains", icon: faBone },
    { name: "Choking", icon: faLungs },
    { name: "Bleeding Control", icon: faTint },
    { name: "Shock Management", icon: faBolt },
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Section */}
      <div className="bg-primary text-white py-5 text-center">
        <h1 className="fw-bold">What can we help you with?</h1>
        <Container className="mt-4">
          <Row className="justify-content-center">
            <Col md={6}>
              <Form className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Type your question here..."
                  className="me-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="danger">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Categories Section */}
      <Container className="py-5">
        <Row>
          {categories.map((category, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <Card className="text-center p-3 shadow-sm">
                <FontAwesomeIcon icon={category.icon} size="3x" className="text-primary mb-3" />
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FirstAid;
