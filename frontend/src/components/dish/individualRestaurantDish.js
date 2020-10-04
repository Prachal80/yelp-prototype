import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default class individualDish extends Component {
  render() {
    return (
      <div
        style={{
          //   marginLeft: "5%",
          marginLeft: "5%",
          //   border: "1px solid black",
          marginTop: "10px",
          marginBottom: "5px",
          padding: "10px",
        }}
      >
        <Card border="secondary" style={{ width: "32rem" }}>
          <Card.Header>
            <h3 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.dishname}
            </h3>
          </Card.Header>
          <Card.Body>
            <Fragment>
              <Container>
                <Row>
                  <Col>
                    <img
                      src={this.props.data.image}
                      style={{
                        width: "200px",
                        height: "150px",
                      }}
                    />
                  </Col>
                  <Col>
                    <p style={{ marginBottom: "0px" }}>
                      Price : {this.props.data.price}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Ingredients : {this.props.data.ingredients}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Category : {this.props.data.category}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Description : {this.props.data.description}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      Restaurant : {this.props.data.restaurantname}
                    </p>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style={{
                        background: "#D32323",
                        color: "#ffffff",
                        fontWeight: "bold",
                        borderBlockColor: "white",
                        border: "1px #D32323",
                      }}
                    >
                      Edit Dish
                    </button>
                    &nbsp;
                  </Col>
                </Row>
              </Container>
            </Fragment>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
