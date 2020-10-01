import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import EachOrderCustomer from "../individual/individualPlacedOrders";

export class customerOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishname: "",
      price: "",
      category: "",
      restaurantname: "",
      status: "",
      orderpic: "",
      orderid: "",
      time: "",
      optiontype: "",
      orders: [],
    };
  }

  componentDidMount() {
    console.log("RID", this.state.restaurantid);
    axios.defaults.withCredentials = true;

    //Get All orders made by a customer
    axios
      .get("http://localhost:5001/customerOrders/getAllOrders", {
        params: {
          CID: localStorage.getItem("CID"),
        },
      })
      .then((response) => {
        console.log("Received all Orders");

        this.setState({
          orders: this.state.orders.concat(response.data.CustomerGetOrder),
        });
      });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("user")) {
      redirectVar = <Redirect to="/login" />;
    }
    let orderDishAll = this.state.orders.map((order) => {
      return (
        <EachOrderCustomer
          /*key={Math.random}*/ data={order}
        ></EachOrderCustomer>
      );
    });

    return (
      <div>
        {redirectVar}
        <div>
          <br />
          <br />
          <h2 style={{ textAlign: "center" }}>Your Orders</h2>
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

export default customerOrders;
