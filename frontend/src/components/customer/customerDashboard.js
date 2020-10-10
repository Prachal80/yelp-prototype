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
      pattern: "",
      searchCriteria: "dishes",
    };
  }
  ChangeHandler = (e) => {
    this.setState({
      filter: e.target.value,
      searchCriteria: "",
    });
  };

  restaurantSearch = (e) => {
    this.setState({
      pattern: e.target.value,
    });
  };

  selectSearchCriteria = (e) => {
    this.setState({
      searchCriteria: e.target.value,
      filter: "",
    });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;

    //Get All dishes
    axios
      .get("http://52.43.207.234:3001/customerDishes/getAllDishes", {
        params: {},
      })
      .then((response) => {
        console.log("Received Dishes");
        this.setState({
          dishes: this.state.dishes.concat(response.data.customerDishGet),
        });
      });

    axios
      .get("http://52.43.207.234:3001/customerDishes/getAllRestaurants", {
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
    if (!localStorage.getItem("CID")) {
      redirectVar = <Redirect to="/login" />;
    }
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
      } else if (this.state.pattern != "") {
        if (
          eachRestaurant[this.state.searchCriteria]
            .toLowerCase()
            .includes(this.state.pattern)
        ) {
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
        <br />
        <div className="row" style={{ textAlign: "center", marginLeft: "5px" }}>
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
            value="Dinein"
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
          &nbsp; &nbsp;
          <form>
            <div className="form-row">
              <div class="form-group " style={{}}>
                <select
                  id="inputState"
                  class="form-control"
                  onChange={this.selectSearchCriteria}
                >
                  <option value="dishes">Dish names</option>
                  <option value="cuisine">Cuisines</option>
                  <option value="location">Location</option>
                  <option value="method">Mode of Delivery</option>
                </select>
              </div>
              &nbsp;
              <div className="form-group ">
                <input
                  type="text"
                  placeholder="Search Restaurants, Dishes and more"
                  onChange={this.restaurantSearch}
                  classNames="test-class"
                />
              </div>
            </div>
          </form>
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

                // borderRadius: "2%",
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
