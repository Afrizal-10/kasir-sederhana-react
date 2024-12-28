import React, {Component} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {numberWithCommas} from "../utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {API_URL} from "../utils/constants";
import {withRouter} from "../utils/withRouter";

class Payment extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then(() => {
      this.props.navigate("/sukses");
    });
  };

  render() {
    const totalBayar = this.props.keranjangs.reduce(
      (result, item) => result + item.total_harga,
      0
    );
    return (
      <>
        {/* web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{span: 3, offset: 9}} className="px-4">
              <h5>
                Total Harga :
                <strong className="float-end me-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h5>
              <Button
                style={{
                  backgroundColor: "#1227c9",
                  display: "block",
                  padding: "0.5rem",
                  marginBottom: 2,
                  marginTop: 3,
                  borderRadius: "0.25rem",
                  width: "100%",
                }}
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <strong className="ms-2">Bayar</strong>
              </Button>
            </Col>
          </Row>
        </div>

        {/* mobile */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{span: 3, offset: 9}} className="px-4">
              <h5>
                Total Harga :
                <strong className="float-end me-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h5>
              <Button
                style={{
                  backgroundColor: "#1227c9",
                  display: "block",
                  padding: "0.5rem",
                  marginBottom: 2,
                  marginTop: 3,
                  borderRadius: "0.25rem",
                  width: "100%",
                }}
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <strong className="ms-2">Bayar</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default withRouter(Payment);
