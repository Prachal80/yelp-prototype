import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import SearchField from "react-search-field";
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
      filter: "",
    };
  }
  ChangeHandler = (e) => {
    this.setState({
      filter: e.target.value,
    });
  };

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
    console.log("filter ", this.state.filter);
    let dishAll = this.state.dishes.map((dish) => {
      return <EachDish key={Math.random} data={dish}></EachDish>;
    });

    let allRestaurants = this.state.restaurants.map((eachRestaurant) => {
      if (this.state.filter != "") {
        if (eachRestaurant.method === this.state.filter) {
          return (
            <EachRestaurant
              // key={Math.random}
              data={eachRestaurant}
            ></EachRestaurant>
          );
        }
      } else {
        return (
          <EachRestaurant
            // key={Math.random}
            data={eachRestaurant}
          ></EachRestaurant>
        );
      }
    });

    return (
      <div>
        {redirectVar}
        <br />
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          Find Restaurants , Dishes and Place orders
        </h2>
        <div
          style={{ textAlign: "center", fontWeight: "bold", marginLeft: "5px" }}
        >
          <button
            style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
            className="btn btn-danger"
            name="option"
            value="Delivery"
            onClick={this.ChangeHandler}
          >
            Yelp Delivery
          </button>
          &nbsp;
          <button
            style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
            className="btn btn-danger"
            name="option"
            value="Pickup"
            onClick={this.ChangeHandler}
          >
            Curbside Pickup
          </button>
          &nbsp;
          <button
            style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
            className="btn btn-danger"
            name="option"
            value="Pickup"
            onClick={this.ChangeHandler}
          >
            Dine In
          </button>
          &nbsp;
          <button
            style={{ float: "left", fontWeight: "bold", marginLeft: "5px" }}
            className="btn btn-secondary"
            name="option"
            value=""
            onClick={this.ChangeHandler}
          >
            Clear
          </button>
          {/* <div> */}
          <SearchField
            color="black"
            placeholder="Search Restaurants, Dishes and more"
            //   onChange={onChange}
            searchText=""
            classNames="test-class"
          />
          {/* </div> */}
        </div>

        <hr />
        <div class="row">
          <div class="overflow-auto" style={{}} className="col-4">
            <h2 style={{ textAlign: "center" }}>Restaurants</h2>
            <div
              class="DishInfo"
              style={{ overflowY: "scroll", height: "700px" }}
            >
              {allRestaurants}
            </div>
          </div>
          <div class="overflow-auto" style={{}} className="col-4">
            <h2 style={{ textAlign: "center" }}>Dishes</h2>
            <div
              class="DishInfo"
              style={{ overflowY: "scroll", height: "700px" }}
            >
              {dishAll}
            </div>
          </div>
          <div className="col-4">
            <h2 style={{ textAlign: "center" }}>Map</h2>

            <Map
              google={this.props.google}
              zoom={13.5}
              style={{
                width: "80%",
                height: "700px",
                border: "1px solid grey",
                marginTop: "10px",
                // paddingRight: "0px",
                borderRadius: "2%",
              }}
            >
              <Marker onClick={this.state.address} name={"Current location"} />
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBIRmVN1sk9HHlXxIAg-3_H5oRb2j-TyC4",
})(CustomerDashboard);
