import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import EachOrderRestaurant from "../individual/individualRestaurantOrders";

export default class restaurantOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishname: "",
      dishimage: "",
      price: "",
      category: "",
      cusotmername: "",
      status: "",
      orderid: "",
      time: "",
      optiontype: "",
      orders: [],
    };
  }
  componentDidMount() {
    axios.defaults.withCredentials = true;
    console.log("mounting");
    //Get All orders made by customers to the restaurant
    axios
      .get("http://localhost:5001/restaurantOrders/getAllOrdersRestaurant", {
        params: {
          RID: localStorage.getItem("RID"),
        },
      })
      .then((response) => {
        console.log("Received all Orders");

        this.setState({
          orders: this.state.orders.concat(response.data.RestaurantGetOrder),
        });
      });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("user")) {
      redirectVar = <Redirect to="/login" />;
    }
    let orderDishAll = this.state.orders.map((order) => {
      return <EachOrderRestaurant data={order}></EachOrderRestaurant>;
    });

    return (
      <div>
        {redirectVar}
        <div>
          <br />
          <br />
          <h2 style={{ textAlign: "center" }}>Orders Made by Customers</h2>
          <br />

          <hr />
        </div>

        <div class="row">
          <div class="overflow-auto" class="leftdiv">
            <div class="DishInfo"></div>
          </div>
          <div
            style={{ width: "100%" }}
            class="overflow-auto"
            class="middlediv"
          >
            <h2 style={{ marginLeft: "19%" }}>All orders</h2>
            {orderDishAll}
          </div>
          <div class="overflow-auto" class="rightdiv"></div>
        </div>
      </div>
    );
  }
}
