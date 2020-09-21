import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import yelp from "../../img/yelp.png";
//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span class="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span class="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <nav
          class="navbar navbar-expand-lg"
          style={{
            background: "#D32323",
            width: "100%",
            height: "60px",
          }}
        >
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <img
              src={yelp}
              alt="Signup Illustration"
              style={{
                width: "100px",
                height: "60px",

                marginLeft: "47%",
                marginRight: "auto",
              }}
            />
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a
                  class="nav-link"
                  style={{ color: "white", fontWeight: "bold" }}
                  href="/login"
                >
                  Login <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item active">
                <a
                  class="nav-link"
                  style={{ color: "white", fontWeight: "bold" }}
                  href="/logout"
                >
                  Logout <span class="sr-only"></span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
