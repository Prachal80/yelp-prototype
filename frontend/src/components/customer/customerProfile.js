import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import pic from "../../img/captain.jpg";
class CustomerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      dob: "",
      city: "",
      state: "",
      country: "",
      nickname: "",
      headline: "",
      phone: "",
      emailid: "",
      blog: "",
      yelpingSince: "",
      thingsIlove: "",
      findMeIn: "",
      imagePath: "",
      ErrorMessage: "",
      CID: "",
    };

    //Bind the handlers to this class
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //submit Login handler to send a request to the node backend
  submitUpdate = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.rname,
      dob: this.state.dob,
      emailid: this.state.emailid,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      nickname: this.state.nickname,
      headline: this.state.headline,
      phone: this.state.phone,
      emailid: this.state.emailid,
      bolg: this.state.blog,
      yelpingSince: this.state.yelpingSince,
      thingsIlove: this.state.thingsIlove,
      findMeIn: this.state.findMeIn,
      ErrorMessage: this.state.ErrorMessage,
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
            window.location.assign("/customer/profile");
          } else {
            window.location.assign("/restaurant/profile");
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
    return (
      <div>
        <div>
          <div class="row">
            <img
              src="http://localhost:5001/uploads/profilePic-1600810353854.jpg"
              alt="Profile Pic"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                margin: "2% 0 0 3%",
              }}
            ></img>
            <div
              class="topHeadline"
              style={{
                position: "absolute",
                width: "60%",
                height: "20%",
                left: "20%",
                top: "15%",
                fontWeight: "bold",
                borderBlockColor: "white",
                border: "1px #D32323",
                textAlign: "center",
              }}
            >
              <p>City, State, Country</p>
              <p>Headline</p>
            </div>
            <div
              class="topHeadline"
              style={{
                position: "absolute",
                width: "20%",
                height: "20%",
                right: "0%",
                top: "15%",
                fontWeight: "bold",
                borderBlockColor: "white",
                border: "1px #D32323",
                textAlign: "justify",
              }}
            >
              <p>Yelping Since:{this.state.yelpingSince}</p>
              <p>Things I Love: {this.state.thingsIlove}</p>
              <p>Find me In: {this.state.findMeIn}</p>
              <p>My blog: {this.state.blog}</p>
            </div>
          </div>
          <br />
          <br />
          <form
            action="http://localhost:5001/profilepic/updateProfilePic"
            method="POST"
            encType="multipart/form-data"
            style={{
              position: "absolute",
              width: "15%",
              marginLeft: "2%",
            }}
          >
            <input
              type="text"
              name="CID"
              value={JSON.parse(localStorage.getItem("CID"))}
              style={{ display: "none", width: "10px" }}
            />
            <input type="file" name="profilePic" />
            <br />
            <br />
            <div>
              <button
                type="submit"
                class="btn btn-primary"
                style={{
                  backgroundColor: "#D32323",
                  color: "#ffffff",
                  fontWeight: "bold",
                  borderBlockColor: "white",
                  border: "1px #D32323",
                  //   width: "10%",
                }}
              >
                Update Picture
              </button>
            </div>
            <br />
            <br />
          </form>
          <div class="wrapper fadeInDown">
            <div
              style={{
                position: "absolute",
                width: "30%",
                top: "55%",
                left: "2%",
              }}
            >
              <p>Name : {this.state.name}</p>
              <p>Email : {this.state.emailid}</p>
              <p>Phone : {this.state.phone}</p>
              <p>DOB : {this.state.dob}</p>
              <p></p>
            </div>
            <div id="formContent">
              <form
                style={{
                  position: "absolute",
                  background: "#ffe6e6",
                  marginLeft: "0%",
                  left: "23%",
                  top: "57%",
                }}
              >
                <Container>
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: "2px",
                    }}
                  >
                    Update your Details
                  </p>
                  <Row>
                    <Col xs lg="3">
                      <input
                        type="taxt"
                        name="name"
                        placeholder="Name"
                        class="form-control"
                        id="exampleInputPassword"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs lg={3}>
                      <input
                        type="date"
                        name="dob"
                        class="form-control"
                        placeholder="DOB"
                        id="dob"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs lg={4}>
                      <input
                        type="text"
                        name="headline"
                        placeholder="Headline"
                        class="form-control"
                        id="headline"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs lg="2">
                      <input
                        type="text"
                        name="city"
                        class="form-control"
                        placeholder="City"
                        id="city"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs lg="2">
                      <input
                        type="text"
                        name="state"
                        class="form-control"
                        id="state"
                        placeholder="State"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs lg={2}>
                      <input
                        type="text"
                        name="country"
                        class="form-control"
                        placeholder="Country"
                        id="country"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs lg={2}>
                      <input
                        type="text"
                        name="nickname"
                        class="form-control"
                        id="nickname"
                        placeholder="Nickname"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md lg={2}>
                      <input
                        type="text"
                        name="yelpingSince"
                        class="form-control"
                        placeholder="Yelping Since"
                        id="Yelping Since"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs lg="2">
                      <input
                        type="text"
                        name="things I Love"
                        class="form-control"
                        id="thingsILove"
                        placeholder="Things I love"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs lg={2}>
                      <input
                        type="text"
                        name="findMeIn"
                        class="form-control"
                        placeholder="Find Me In"
                        id="findMeIn"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs lg={2}>
                      <input
                        type="text"
                        name="blog"
                        class="form-control"
                        id="blog"
                        placeholder="My Blog"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs lg={2}>
                      <input
                        type="email"
                        name="emailid"
                        class="form-control"
                        placeholder="Email"
                        id="emailid"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs lg={2}>
                      <input
                        type="text"
                        name="phone"
                        class="form-control"
                        id="phone"
                        placeholder="Phone"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                </Container>
                <br />
                <button
                  type="submit"
                  class="btn btn-primary"
                  style={{
                    background: "#D32323",
                    color: "#ffffff",
                    fontWeight: "bold",
                    borderBlockColor: "white",
                    fontWeight: "bold",
                    border: "1px #D32323",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerDashboard;
