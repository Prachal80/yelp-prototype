import React, { Component } from "react";
import { Redirect } from "react-router";
export class restaurantOrders extends Component {
  render() {
    let redirectVar = null;
    if (!localStorage.getItem("user")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        Restaurant Orders
      </div>
    );
  }
}

export default restaurantOrders;
