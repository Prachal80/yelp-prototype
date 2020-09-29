import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      address: "",
      state: "",
      country: "",
      description: "",
      timings: "",
      email: "",
      contact: "",
      ErrorMessage: "",
    };

    //Bind the handlers to this class
    this.ChangeHandler = this.ChangeHandler.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }
  componentDidMount() {
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    let data = {
      RID: localStorage.getItem("RID"),
    };
    axios({
      url: "http://localhost:5001/restaurantProfile/getRestaurantProfile",
      method: "GET",
      params: data,
    }).then((response) => {
      // console.log("profile details", response.data.profileData[0]);

      let restaurantData = response.data.restaurantProfileData[0];
      this.setState({
        name: restaurantData.name,
        location: restaurantData.location,
        address: restaurantData.address,
        state: restaurantData.state,
        country: restaurantData.country,
        description: restaurantData.description,
        timings: restaurantData.timings,
        email: restaurantData.email,
        contact: restaurantData.contact,
        restaurantprofilepic: restaurantData.restaurantprofilepic,
      });
    });
  }
  // change handlers to update state variable with the text entered by the user
  ChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //submit Login handler to send a request to the node backend
  submitUpdate = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      name: this.state.name,
      location: this.state.location,
      address: this.state.address,
      state: this.state.state,
      country: this.state.country,
      description: this.state.description,
      timings: this.state.timings,
      email: this.state.email,
      contact: this.state.contact,
      restaurantprofilepic: this.state.restaurantprofilepic,
      RID: localStorage.getItem("RID"),
    };

    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log("#############", data);
    axios
      .post(
        "http://localhost:5001/restaurantProfile/updateRestaurantProfile",
        data
      )
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response, ", response.data.success);
        if (
          response.data.success &&
          localStorage.getItem("user") === "restaurant"
        ) {
          window.location.assign("/restaurant/profile");
        }
      })
      .catch((response) => {
        console.log("********** Catch", response);
        this.setState({
          authFlag: false,
          ErrorMessage: "Invalid Login Credentials",
        });
      });
  };

  // componentDidMount() {
  //   axios
  //     .get("http://localhost:5001/getDishes", {
  //       params: {
  //         RID: localStorage.getItem("RID"),
  //       },
  //     })
  //     .then((response) => {
  //       console.log("Received Dishes");
  //       //update the state with the response data
  //       this.setState({
  //         dishes: this.state.dishes.concat(response.data),
  //       });
  //     });
  // }

  render() {
    return (
      <div>
        <div>
          <div class="row" style={{ backgroundColor: "#e6e6e6" }}>
            <div
              style={{
                marginTop: "2%",
                marginLeft: "3%",
              }}
            >
              <p>Name : {this.state.name}</p>
              <p>Email : {this.state.email}</p>
              <p>Contact : {this.state.contact}</p>
              <p>Timings : {this.state.timings}</p>
              <p>Description : {this.state.description}</p>
            </div>
            <img
              src={this.state.restaurantprofilepic}
              alt="Profile Pic"
              style={{
                width: "500px",
                height: "300px",

                marginLeft: "18%",
                // marginRight: "auto",
              }}
            ></img>
            <div
              style={{
                marginTop: "2%",
                marginRight: "2%",
                marginleft: "5%",
                paddingLeft: "3%",
              }}
            >
              <p>Location City : {this.state.location}</p>
              <p>Address : {this.state.address}</p>
              <p>State : {this.state.state}</p>
              <p>Country : {this.state.country}</p>
            </div>
          </div>
          <br />
          <br />

          <form
            action="http://localhost:5001/restaurantProfile/updateRestaurantProfilePic"
            method="POST"
            encType="multipart/form-data"
            style={{
              position: "absolute",
              width: "15%",
              left: "2%",
            }}
          >
            <input
              type="text"
              name="RID"
              value={JSON.parse(localStorage.getItem("RID"))}
              style={{ display: "none", width: "10px" }}
            />
            <input type="file" name="restaurantprofilePic" />
            <br />

            <button
              type="submit"
              class="btn "
              style={{
                backgroundColor: "#D32323",
                color: "#ffffff",
                fontWeight: "bold",
                borderBlockColor: "white",
                border: "1px #D32323",
              }}
            >
              Update Picture
            </button>

            <br />
          </form>

          <div class="wrapper fadeInDown">
            <br />

            <div id="formContent">
              <form
                onSubmit={this.submitUpdate}
                style={{
                  position: "absolute",
                  background: "#ffe6e6",
                  marginLeft: "0%",

                  left: "2%",
                  top: "65%",
                  borderRadius: "2%",
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
                    <Col xs={4}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        class="form-control"
                        onChange={this.ChangeHandler}
                      />
                    </Col>

                    <Col xs={8}>
                      <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        class="form-control"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="location"
                        class="form-control"
                        placeholder="Loaction City"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="address"
                        class="form-control"
                        placeholder="Address"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="state"
                        class="form-control"
                        id="state"
                        placeholder="State"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={3}>
                      <input
                        type="text"
                        name="country"
                        class="form-control"
                        placeholder="Country"
                        id="country"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={4}>
                      <input
                        type="email"
                        name="emailid"
                        class="form-control"
                        placeholder="Email"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={4}>
                      <input
                        type="text"
                        name="contact"
                        class="form-control"
                        placeholder="Contact"
                        onChange={this.ChangeHandler}
                      />
                    </Col>
                    <Col xs={4}>
                      <input
                        type="text"
                        name="timings"
                        class="form-control"
                        placeholder="Timings"
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
                  }}
                >
                  Submit
                </button>
              </form>
              <div style={{ marginLeft: "75%", width: "30px", height: "40px" }}>
                <Map
                  google={this.props.google}
                  zoom={14}
                  style={{ width: "300px", height: "400px" }}
                >
                  <Marker
                    onClick={this.state.address}
                    name={"Current location"}
                  />

                  <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                      <h1>{this.state.address}</h1>
                    </div>
                  </InfoWindow>
                </Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyBIRmVN1sk9HHlXxIAg-3_H5oRb2j-TyC4",
})(RestaurantProfile);
