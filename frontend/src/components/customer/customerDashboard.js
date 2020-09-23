import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      userType: "",
      authFlag: false,
      ErrorMessage: "",
    };

    //Bind the handlers to this class
    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);
    // this.userTypeChangeHandler = this.userTypeChangeHandler.bind(this);
  }
  render() {
    console.log("hi");
    return (
      <div>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src="frontend/src/img/captain.jpg/171x180" rounded />
            </Col>
            <Col xs={6} md={4}>
              <Image src="frontend/src/img/captain.jpg/171x180" roundedCircle />
            </Col>
            <Col xs={6} md={4}>
              <Image src="frontend/src/img/captain.jpg/171x180" thumbnail />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CustomerDashboard;
