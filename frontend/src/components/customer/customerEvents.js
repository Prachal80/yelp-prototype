import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import EachEventCustomer from "../individual/individualEvents";
import EachRegisteredEvent from "../individual/individualRegistredEvents";

export class CustomerEvents extends Component {
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
      events: [],
      registered_events: [],
    };
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;

    //Get All unregistered events
    axios
      .get("http://localhost:5001/customerEvents/getAllEvents", {
        params: {
          CID: localStorage.getItem("CID"),
        },
      })
      .then((response) => {
        console.log("Received all unregistered Events");

        this.setState({
          events: this.state.events.concat(response.data.customerEventsGet),
        });
      });

    //Get All registered events
    axios
      .get("http://localhost:5001/customerEvents/getRegisteredEvents", {
        params: {
          CID: localStorage.getItem("CID"),
        },
      })
      .then((response) => {
        console.log("Received all registered Events");

        this.setState({
          registered_events: this.state.registered_events.concat(
            response.data.getRegisteredEvents
          ),
        });
      });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem("user")) {
      redirectVar = <Redirect to="/login" />;
    }
    let upcomingEvents = this.state.events.map((event) => {
      return <EachEventCustomer data={event}></EachEventCustomer>;
    });

    let registeredEvents = this.state.registered_events.map(
      (registeredEvent) => {
        return (
          <EachRegisteredEvent data={registeredEvent}></EachRegisteredEvent>
        );
      }
    );

    return (
      <div>
        {redirectVar}
        <div>
          <br />
          <br />
          <h2 style={{ textAlign: "center" }}> Events</h2>
          <br />

          <hr />
        </div>

        <div class="row">
          <div style={{ width: "40%", marginLeft: "10%" }} class="leftdiv">
            <h2 style={{ marginLeft: "13%" }}>Upcoming Events</h2>
            {upcomingEvents}
          </div>
          <div style={{ width: "50%", marginLeft: "50%" }} class="middlediv">
            <h2>Registered Events</h2>
            {registeredEvents}
          </div>
          {/* <div
            style={{ width: "50%", marginLeft: "59%" }}
            class="rightdiv"
            class="col"
          >
            <h2>Registered Events</h2>
            {registeredEvents}
          </div> */}
        </div>
      </div>
    );
  }
}

export default CustomerEvents;
