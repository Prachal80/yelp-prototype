import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

class customerEventView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventname: "",
      eventdescription: "",
      eventtime: "",
      eventdate: "",
      eventlocation: "",
      hashtags: "",
      restaurantname: "",
      customername: "",
      restaurantid: "",
      customerid: "",
      ErrorMessage: "",
    };
  }

  //Register for the event
  registerEvent = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const data = {
      eventname: this.state.eventname,
      eventdescription: this.state.eventdescription,
      eventtime: this.state.eventtime,
      eventdate: this.state.eventdate.slice(0, 10).replace("T", " "),
      eventlocation: this.state.eventlocation,
      hashtags: this.state.hashtags,
      restaurantid: this.state.restaurantid,
      restaurantname: this.state.restaurantname,
      customername: localStorage.getItem("Cname"),
      customerid: localStorage.getItem("CID"),
    };
    console.log("Review Data", data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post("http://localhost:5001/customerEvents/registerEventCustomer", data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        console.log("response, ", response.data.success);
        if (response.data.success) {
          window.location.assign("/customer/events");
        }
      })
      .catch((response) => {
        this.setState({
          ErrorMessage: "Event Register Error",
        });
      });
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;

    //make a get request for the user data
    let data = {
      eventid: this.props.location.state.eventid,
    };
    console.log("########### Getting Event deatails", data);
    axios({
      url: "http://localhost:5001/customerEvents/getSingleEvent",
      method: "GET",
      params: data,
    }).then((response) => {
      // console.log("profile details", response.data.profileData[0]);
      let EventData = response.data.customerEventDetails[0];
      this.setState({
        eventname: EventData.eventname,
        eventdescription: EventData.eventdescription,
        eventtime: EventData.eventtime,
        eventdate: EventData.eventdate.slice(0, 10).replace("T", " "),
        eventlocation: EventData.eventlocation,
        hashtags: EventData.hashtags,
        restaurantname: EventData.restaurantname,
        restaurantid: EventData.restaurantid,
      });
    });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("user")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="centered">
          <h1 style={{ textAlign: "center" }}> Event Details </h1>
          <hr />
          <Card border="secondary" style={{ width: "50rem", margin: "auto" }}>
            <Card.Header>
              <h5 style={{ textAlign: "center", alignContent: "center" }}>
                {this.state.eventname}
              </h5>
            </Card.Header>
            <Card.Body>
              <Fragment>
                <Container>
                  <Row xs={60}>
                    <Col xs={60}>
                      <p style={{ marginBottom: "0px" }}>
                        Location :{this.state.eventlocation}
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Date:{" "}
                        {this.state.eventdate.slice(0, 10).replace("T", " ")}
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Time: {this.state.eventtime}
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Organized by: {this.state.restaurantname}
                      </p>
                      <p style={{ marginBottom: "0px" }}>
                        Description: {this.state.eventdescription}
                      </p>
                      <p style={{ marginBottom: "4px" }}>
                        Hashtags: {this.state.hashtags}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        background: "#D32323",
                        color: "#ffffff",
                        fontWeight: "bold",
                        borderBlockColor: "white",
                        fontWeight: "bold",
                        border: "1px #D32323",
                      }}
                      onClick={this.registerEvent}
                    >
                      Register
                    </button>
                  </Row>
                </Container>
              </Fragment>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default customerEventView;
