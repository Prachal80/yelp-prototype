import React, { Component, useState } from "react";
import axios from "axios";

import { Card, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { zIndex } from "react-z-index";
import EachDish from "../dish/individualDish";
import { BsStarFill } from "react-icons/all";

class RestaurantDashboard extends Component {
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

      dishes: [],
    };

    //Bind the handlers to this class
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    // this.onClick = this.onClick.bind(this);
  }

  submitUpdate = (e) => {
    e.preventDefault();
    const data = {
      dishname: this.state.dishname,
      ingredients: this.state.ingredients,
      image: this.state.image,
      price: this.state.price,
      description: this.state.description,
      category: this.state.category,
      RID: localStorage.getItem("RID"),
      ratings: this.state.ratings,
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:5001/restaurantDishes/addRestaurantDishes", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response, ", response.data.success);
        if (response.data.success) {
          window.location.assign("/restaurant/dashboard");
        }
      })
      .catch((response) => {
        this.setState({
          authFlag: false,
          ErrorMessage: "Something went wrong on dish adding",
        });
      });
  };
  componentDidMount() {
    axios.defaults.withCredentials = true;
    //make a post request with the Restaurant data
    let data = {
      RID: localStorage.getItem("RID"),
    };
    axios({
      url: "http://localhost:5001/restaurantProfile/getRestaurantProfile",
      method: "GET",
      params: data,
    }).then((response) => {
      // console.log("profile details", response.data.profileData[0]);

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
          RID: localStorage.getItem("RID"),
        },
      })
      .then((response) => {
        console.log("Received Dishes");

        this.setState({
          dishes: this.state.dishes.concat(response.data.restaurantDishGet),
        });
      });
  }

  submitUpdate = (e) => {
    e.preventDefault();
    var formData = new FormData();
    console.log(
      "form data ",
      document.getElementsByName("restaurantDishImage")[0].files[0]
    );
    formData.append("dishname", this.state.dishname);
    formData.append("category", this.state.category);
    formData.append("description", this.state.description);
    formData.append("ingredients", this.state.ingredients);
    formData.append(
      "restaurantDishImage",
      document.getElementsByName("restaurantDishImage")[0].files[0]
    );
    formData.append("price", this.state.price);
    formData.append("RID", localStorage.getItem("RID"));
    formData.append("Rname", localStorage.getItem("Rname"));
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .post(
        "http://localhost:5001/restaurantDishes/addRestaurantDishes",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response, ", response.data.success);
        if (response.data.success) {
          window.location.assign("/restaurant/dashboard");
        }
      })
      .catch((response) => {
        this.setState({
          ErrorMessage: "Something went wrong while adding dish",
        });
      });
  };

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //   onClick() {
  //     // On click we change our state – this will trigger our `render` method
  //     this.setState({ showForm: true });
  //   }

  showForm() {
    return (
      <form
        class="DishFrom"
        name="DishForm"
        onSubmit={this.submitUpdate}
        style={{
          position: "absolute",
          background: "#ffe6e6",
          marginLeft: "0%",
          zIndex: "100",
          left: "20%",
          top: "60%",
          borderRadius: "2%",
        }}
      >
        <Container>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "2px",
            }}
          >
            Add Dish
          </p>
          <Row>
            <Col xs={5}>
              <input
                type="text"
                name="dishname"
                placeholder="Dish Name"
                class="form-control"
                onChange={this.ChangeHandler}
              />
            </Col>
            <Col xs={5}>
              <select
                name="category"
                class="form-control"
                value={this.state.value}
                onChange={this.ChangeHandler}
                isSearchable
                required
              >
                <option value="select" selected disabled>
                  Select
                </option>
                <option value="Appetizer">Appetizer </option>
                <option value="Salads">Salads</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
                <option value="Beverages">Beverages</option>
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={10}>
              <input
                type="text"
                name="description"
                placeholder="Description"
                class="form-control"
                onChange={this.ChangeHandler}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={4}>
              <input
                type="text"
                name="ingredients"
                class="form-control"
                placeholder="Ingredients"
                onChange={this.ChangeHandler}
              />
            </Col>
            <Col xs={2}>
              <input
                type="text"
                name="price"
                class="form-control"
                placeholder="Price"
                onChange={this.ChangeHandler}
              />
            </Col>
            <Col xs={2}>
              <input type="file" name="restaurantDishImage" />
              {/* <input type="file" name="image2" /> */}
            </Col>
          </Row>
        </Container>
        <br />
        <button
          type="submit"
          class="btn btn-primary"
          style={{
            type: "button",
            background: "#D32323",
            color: "#ffffff",
            fontWeight: "bold",
            borderBlockColor: "white",
            fontWeight: "bold",
            border: "1px #D32323",
          }}
        >
          Submit
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <button
          onClick={() => this.setState({ showForm: false })}
          type="submit"
          class="btn btn-primary"
          style={{
            background: "#D32323",
            color: "#ffffff",
            fontWeight: "bold",
            borderBlockColor: "white",
            fontWeight: "bold",
            border: "1px #D32323",
            MarginLeft: "10px",
          }}
        >
          Close
        </button>
      </form>
    );
  }
  render() {
    let dishAll = this.state.dishes.map((dish) => {
      return <EachDish key={Math.random} data={dish}></EachDish>;
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
          <div class="formContent">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => this.setState({ showForm: true })}
              style={{
                marginLeft: "30%",
                background: "#D32323",
                color: "#ffffff",
                fontWeight: "bold",
                borderBlockColor: "white",
                fontWeight: "bold",
                border: "1px #D32323",
              }}
            >
              Add New Dish
            </button>

            {this.state.showForm ? this.showForm() : null}
          </div>
          <div class="wrapper fadeInDown">
            <br />

            <div class="DishInfo">{dishAll}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyBIRmVN1sk9HHlXxIAg-3_H5oRb2j-TyC4",
})(RestaurantDashboard);
