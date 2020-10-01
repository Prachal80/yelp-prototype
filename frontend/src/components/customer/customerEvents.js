import React, { Component } from "react";
import { Redirect } from "react-router";

export default class customerEvents extends Component {
  render() {
    let redirectVar = null;
    if (!localStorage.getItem("user")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        Customer Events
      </div>
    );
  }
}
