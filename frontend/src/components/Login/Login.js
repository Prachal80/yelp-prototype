import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
// import cookie from "react-cookies";

import logo from "../../img/signup_illustration.png";
import { Redirect } from "react-router";

const options = [
  { label: "customer", value: "customer" },
  { label: "restaurant", value: "restaurant" },
];

//Define a Login Component
class Login extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      username: "",
      password: "",
      userType: "",
      authFlag: false,
      ErrorMessage: "",
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.userTypeChangeHandler = this.userTypeChangeHandler.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false,
    });
  }
  //username change handler to update state variable with the text entered by the user
  usernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  userTypeChangeHandler = (e) => {
    console.log("user type: ", e.target.value);
    this.setState({
      userType: e.target.value,
    });
  };
  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
      userType: this.state.userType,
    };
    console.log(data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:5001/login", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response, ", response.data.success);
        if (response.data.success) {
          if (this.state.userType === "customer") {
            window.location.assign("/customer/dashboard");
          } else {
            window.location.assign("/restaurant/dashboard");
          }
        }
      })
      .catch((response) => {
        this.setState({
          authFlag: false,
          ErrorMessage: "Invalid Login Credentials",
        });
      });
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (localStorage.getItem("id")) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        <nav
          style={{
            background: "#D32323",
            width: "100%",
            height: "60px",
          }}
        ></nav>
        <div className="container">
          <form
            id="myForm"
            style={{
              margin: "20%",
              width: "25%",
              float: "left",
              marginTop: "300px",
            }}
            onSubmit={this.submitLogin}
          >
            <label for="myForm">
              <span
                style={{
                  color: "#D32323",
                  fontSize: "15pt",
                  fontWeight: "bold",
                }}
              >
                Sign in to Yelp:
              </span>

              <p
                style={{
                  fontSize: "12pt",
                  fontWeight: "bold",
                }}
              >
                New to yelp ? <l>Signup</l>
              </p>
            </label>
            <div class="form-group">
              <input
                placeholder="Email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                onChange={this.usernameChangeHandler}
              />
            </div>
            <div class="form-group">
              <input
                placeholder="Password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                required
                onChange={this.passwordChangeHandler}
              />
            </div>
            <div class="form-group">
              <label for="inputState">User Type:</label>
              <select
                id="userType"
                class="form-control"
                onChange={this.userTypeChangeHandler}
                value={this.state.value}
                isSearchable
                required
              >
                <option value="select" selected disabled>
                  Select
                </option>
                <option value="customer">Customer</option>
                <option value="restaurant">Restaurant</option>
              </select>
              {/* Select <i className="text-danger">required</i> */}
              {/* <select options={options} required /> */}
            </div>
            <button
              type="submit"
              class="btn "
              style={{
                width: "100%",
                color: "#ffffff",
                fontWeight: "bold",
                backgroundColor: "#D32323",
              }}
            >
              Sign In
            </button>
          </form>
          <img
            className="image-work"
            src={logo}
            alt="Signup Illustration"
            style={{ marginTop: "200px" }}
          />
        </div>
      </div>
    );
  }
}
//export Login Component
export default Login;
