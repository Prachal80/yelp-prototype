import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import SearchField from "react-search-field";
import { Card, ListGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import EachDish from "../individual/individualOrderDish";
import EachRestaurant from "../individual/individualRestaurants";

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      userType: "",
      authFlag: false,
      ErrorMessage: "",
      dishes: [],
      restaurants: [],
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    //Get All dishes
    axios
      .get("http://localhost:5001/customerDishes/getAllDishes", {
        params: {},
      })
      .then((response) => {
        console.log("Received Dishes");
        this.setState({
          dishes: this.state.dishes.concat(response.data.customerDishGet),
        });
      });

    axios
      .get("http://localhost:5001/customerDishes/getAllRestaurants", {
        params: {},
      })
      .then((response) => {
        console.log("Received All restaurants");
        this.setState({
          restaurants: this.state.restaurants.concat(
            response.data.allRestaurants
          ),
        });
      });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("user")) {
      redirectVar = <Redirect to="/login" />;
    }

    let dishAll = this.state.dishes.map((dish) => {
      return <EachDish key={Math.random} data={dish}></EachDish>;
    });

    let allRestaurants = this.state.restaurants.map((eachRestaurant) => {
      return (
        <EachRestaurant
          key={Math.random}
          data={eachRestaurant}
        ></EachRestaurant>
      );
    });

    return (
      <div>
        {redirectVar}
        <br />

        <h2 style={{ textAlign: "center" }}>
          Find Restaurants , Dishes and Place orders
        </h2>
        <div style={{ textAlign: "center", color: "black" }}>
          <SearchField
            color="black"
            placeholder="Search Restaurants, Dishes and more"
            //   onChange={onChange}
            searchText=""
            classNames="test-class"
          />
        </div>
        <hr />
        <div class="row">
          <div class="overflow-auto" class="leftdiv">
            <div class="DishInfo">
              <h2 style={{ marginLeft: "7em" }}>Restaurants</h2>
              <div class="DishInfo">{allRestaurants}</div>
            </div>
          </div>
          <div class="overflow-auto" class="middlediv">
            <h2 style={{ marginLeft: "8em" }}>Dishes</h2>
            {dishAll}
          </div>
          <div class="overflow-auto" class="rightdiv">
            <h2 style={{ marginLeft: "5em" }}>Map</h2>
            <div style={{ paddingLeft: "10px" }}>
              <Map
                google={this.props.google}
                zoom={13.5}
                style={{
                  width: "300px",
                  height: "700px",
                  border: "1px solid grey",
                  marginTop: "10px",
                  marginLeft: "2%",
                  borderRadius: "2%",
                }}
              >
                <Marker
                  onClick={this.state.address}
                  name={"Current location"}
                />
              </Map>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBIRmVN1sk9HHlXxIAg-3_H5oRb2j-TyC4",
})(CustomerDashboard);
