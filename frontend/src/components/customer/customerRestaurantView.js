import React, { Component } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { BsStarFill } from "react-icons/all";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import OrderEachDish from "../individual/individualOrderDish";

class customerRestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantid: this.props.location.state.restaurantid,
      path: this.props.location.state.path,
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
      restaurantprofilepic: "",
      dishes: [],
    };
  }

  componentDidMount() {
    console.log("RID", this.state.restaurantid);
    axios.defaults.withCredentials = true;
    //make a get request with the Restaurant data
    let data = {
      RID: this.state.restaurantid,
    };
    axios({
      url: "http://localhost:5001/restaurantProfile/getRestaurantProfile",
      method: "GET",
      params: data,
    }).then((response) => {
      console.log("profile details", response.data.restaurantProfileData[0]);

      let restaurantData = response.data.restaurantProfileData[0];
      this.setState({
        name: restaurantData.name,
        location: restaurantData.location,
        address: restaurantData.address,
        state: restaurantData.state,
        country: restaurantData.country,
        description: restaurantData.description,
        timings: restaurantData.timings,
        email: restaurantData.email,
        contact: restaurantData.contact,
        restaurantprofilepic: restaurantData.restaurantprofilepic,
        ratings: restaurantData.ratings,
      });
    });
    //Get All dishes
    axios
      .get("http://localhost:5001/restaurantDishes/getAllDishes", {
        params: {
          RID: this.state.restaurantid,
        },
      })
      .then((response) => {
        console.log("Received Dishes");

        this.setState({
          dishes: this.state.dishes.concat(response.data.restaurantDishGet),
        });
      });
  }

  render() {
    let orderDishAll = this.state.dishes.map((dish) => {
      return <OrderEachDish key={Math.random} data={dish}></OrderEachDish>;
    });
    return (
      <div>
        <div>
          <div class="row" style={{ marginTop: "2%" }}>
            <div
              style={{
                marginLeft: "2%",
                marginRight: "1%",
              }}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Header>Name : {this.state.name}</Card.Header>
                <ListGroup variant="primary">
                  <ListGroup.Item>Email : {this.state.email}</ListGroup.Item>
                  <ListGroup.Item>
                    Contact : {this.state.contact}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Timings : {this.state.timings}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description : {this.state.description}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
            <div
              style={{
                marginRight: "1%",
              }}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Header>Location City : {this.state.location}</Card.Header>
                <ListGroup variant="primary">
                  <ListGroup.Item>
                    Address : {this.state.address}
                  </ListGroup.Item>
                  <ListGroup.Item>State : {this.state.state}</ListGroup.Item>
                  <ListGroup.Item>
                    Country : {this.state.country}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Ratings : {this.state.ratings} <BsStarFill />
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
            <div>
              <img
                src={this.state.restaurantprofilepic}
                alt="Profile Pic"
                style={{
                  width: "400px",
                  height: "250px",
                  border: "1px grey",

                  // marginLeft: "18%",
                }}
              ></img>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <Map
                google={this.props.google}
                zoom={16}
                style={{
                  width: "400px",
                  height: "250px",
                  border: "1px grey",
                }}
              >
                <Marker
                  onClick={this.state.address}
                  name={"Current location"}
                />

                <InfoWindow onClose={this.onInfoWindowClose}>
                  <div>
                    <h1>{this.state.address}</h1>
                  </div>
                </InfoWindow>
              </Map>
            </div>
          </div>

          <hr />
          <br />
          <br />
          <div class="row">
            <div
              style={{
                marginLeft: "10%",
              }}
              class="overflow-auto"
              class="lefttdiv"
            >
              {orderDishAll}
            </div>
            <div class="rightdiv">
              <div
                style={{
                  marginLeft: "70%",
                  marginTop: "5%",
                  border: "1px solid black",
                  width: "90%",
                  height: "15%",
                  padding: "5%",
                }}
              >
                <Form.Group>
                  <Form.Row>
                    <Form.Control
                      placeholder="Ratings out of 5"
                      style={{ width: "50%" }}
                    />
                    <br />
                    <br />
                    <Form.Control placeholder="Review" />
                  </Form.Row>
                  <br />
                  <Button
                    type="submit"
                    style={{ background: "#D32323", border: "1px solid black" }}
                  >
                    Submit Review
                  </Button>
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBIRmVN1sk9HHlXxIAg-3_H5oRb2j-TyC4",
})(customerRestaurantView);
