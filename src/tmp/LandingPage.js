import { Component } from "react";
import CardHolder from "../tmp2/CardHolder";
import MyCalendar from "../tmp2/MyCalendar";
import Header from "../tmp2/Header";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import InputForm from "../tmp2/InputForm";

export class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <Header />
        <Container>
          <Row>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <MyCalendar />
                </ListGroup.Item>
                <ListGroup.Item>
                  <InputForm />
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={9}>
              <CardHolder databaseFlag="" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LandingPage;
