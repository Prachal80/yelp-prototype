import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class CustomerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      userType: "",
      authFlag: false,
      ErrorMessage: "",
    };

    //Bind the handlers to this class
    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);
    // this.userTypeChangeHandler = this.userTypeChangeHandler.bind(this);
  }
  render() {
    console.log("hi");
    return (
      <div>
        <p>Customer Dashboard</p>
      </div>
    );
  }
}

export default CustomerDashboard;
