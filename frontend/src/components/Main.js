import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login/Login";
import Logout from "./Logout/logout";
import Signup from "./Login/Signup";
import CustomerDashboard from "./customer/customerDashboard";
import CustomerProfile from "./customer/customerProfile";
import RestaurantDashboard from "./restaurant/restaurantDashboard";
import RestaurantProfile from "./restaurant/restaurantProfile";
import Navbar from "./Landing Page/Navbar.js";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={Navbar} />
        <Route path="/signup" component={Signup} />
        <Route path="/customer/profile" component={CustomerProfile} />
        <Route path="/restaurant/profile" component={RestaurantProfile} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/customer/dashboard" component={CustomerDashboard} />
        <Route path="/restaurant/dashboard" component={RestaurantDashboard} />
        {/* <Route path="/home" component={Home} /> */}
      </div>
    );
  }
}
//Export The Main Component
export default Main;
