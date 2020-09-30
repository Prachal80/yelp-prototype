import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { BsStarFill } from "react-icons/all";
import axios from "axios";
import { Router } from "react-router";
import customerrestaurantview from "../customer/customerRestaurantView";
import { Button } from "react-bootstrap";

export default class individualRestaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      address: "",
      state: "",
      country: "",
      description: "",
      timings: "",
      email: "",
      contact: "",
      ratings: "",
      ErrorMessage: "",

      showForm: false,
      //Dish data
      //   dishname: "",
      //   ingredients: "",
      //   image: "",
      //   price: "",
      //   description: "",
      //   category: "",
    };

    //Bind the handlers to this class
    // this.ChangeHandler = this.ChangeHandler.bind(this);
    // this.submitUpdate = this.submitUpdate.bind(this);
    // // this.onClick = this.onClick.bind(this);
    // this.viewRestaurant = this.viewRestaurant.bind(this);
  }
  //   componentDidMount() {}
  //   viewRestaurant = (e) => {
  //     // e.preventDefault();
  //     //window.location.assign("restaurant/events");
  //     return (
  //       <Link
  //         to="/customer/customerrestaurantview"
  //         params={{ testvalue: "hello" }}
  //       ></Link>
  //     );
  //   };
  render() {
    return (
      <div
        style={{
          //   marginLeft: "5%",
          marginLeft: "5%",
          //   border: "1px solid black",
          marginTop: "10px",
          marginBottom: "5px",
          padding: "10px",
          //   height: "300px",
          //   width: "600px",
        }}
      >
        <Card border="secondary" style={{ width: "32rem" }}>
          <Card.Header>
            <h3 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.name}
            </h3>
          </Card.Header>
          <Card.Body>
            <Fragment>
              <Container>
                <Row>
                  <Col>
                    <img
                      src={this.props.data.restaurantprofilepic}
                      alt="Dish Image"
                      style={{
                        width: "200px",
                        height: "150px",
                      }}
                    />
                  </Col>
                  <Col xs={6}>
                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.address}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.location}, {this.props.data.state}
                    </p>

                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.timings}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.contact}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.email}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      {this.props.data.ratings} <BsStarFill />
                    </p>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    {/* <button
                      type="submit"
                      onClick={this.viewRestaurant}
                      class="btn btn-primary"
                      style={{
                        background: "#D32323",
                        color: "#ffffff",
                        fontWeight: "bold",
                        borderBlockColor: "white",
                        fontWeight: "bold",
                        border: "1px #D32323",
                      }}
                    >
                      View Details
                    </button> */}
                    <Link
                      className="btn btn-primary"
                      style={{
                        background: "#D32323",
                        color: "#ffffff",
                        fontWeight: "bold",
                        borderBlockColor: "white",
                        fontWeight: "bold",
                        border: "1px #D32323",
                      }}
                      to={{
                        pathname: "/customer/customerrestaurantview",
                        state: {
                          restaurantid: this.props.data.id,
                          path: "/customer/dashboard",
                        },
                      }}
                    >
                      Details
                    </Link>
                    &nbsp;
                  </Col>
                </Row>
              </Container>
            </Fragment>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
