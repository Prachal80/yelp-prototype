import React, { Component, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class individualDish extends Component {
  render() {
    return (
      <div
        style={{
          marginLeft: "15%",

          border: "1px solid black",
          marginTop: "10px",
          padding: "10px",
          height: "300px",
          width: "500px",
        }}
      >
        <Fragment>
          <Container>
            <h3 style={{ textAlign: "center", alignContent: "center" }}>
              {this.props.data.dishname}
            </h3>

            <Row>
              <Col>
                <img
                  src={this.props.data.image}
                  alt="Dish Image"
                  style={{
                    width: "200px",
                    height: "150px",
                  }}
                />
              </Col>
              <Col>
                <p>Price : {this.props.data.price}</p>
                <p>Ingredients : {this.props.data.ingredients}</p>
                <p>Category : {this.props.data.category}</p>
                <p>Description : {this.props.data.description}</p>
              </Col>
            </Row>
            <Row>
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
                Edit
              </button>
              &nbsp;
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
                Remove
              </button>
            </Row>
          </Container>
        </Fragment>
      </div>
    );
  }
}
