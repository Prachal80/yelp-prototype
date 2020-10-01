import React, { Component } from "react";
import { Redirect } from "react-router";
export class restaurantEvents extends Component {
  render() {
    let redirectVar = null;
    if (!localStorage.getItem("user")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        Restaurant Events
      </div>
    );
  }
}

export default restaurantEvents;
