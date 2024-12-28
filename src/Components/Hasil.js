import React, {Component} from "react";
import {Badge, Card, Col, ListGroup, Row} from "react-bootstrap";
import {numberWithCommas} from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import {API_URL} from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: null,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menukeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menukeranjang,
      jumlah: menukeranjang.jumlah,
      keterangan: menukeranjang.keterangan || "",
      totalHarga: menukeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      keranjangDetail: null,
    });
  };

  tambah = () => {
    this.setState((prevState) => ({
      jumlah: prevState.jumlah + 1,
      totalHarga:
        prevState.keranjangDetail.product.harga * (prevState.jumlah + 1),
    }));
  };

  kurang = () => {
    if (this.state.jumlah > 1) {
      this.setState((prevState) => ({
        jumlah: prevState.jumlah - 1,
        totalHarga:
          prevState.keranjangDetail.product.harga * (prevState.jumlah - 1),
      }));
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {jumlah, totalHarga, keranjangDetail, keterangan} = this.state;

    const data = {
      jumlah,
      total_harga: totalHarga,
      product: keranjangDetail.product,
      keterangan,
    };

    axios
      .put(`${API_URL}keranjangs/${keranjangDetail.id}`, data)
      .then(() => {
        Swal.fire({
          title: "Update Pesanan",
          text: `Sukses Update Pesanan ${data.product.nama}`,
          icon: "success",
        });
        this.handleClose();
        this.props.refreshData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  hapusPesanan = () => {
    const {keranjangDetail} = this.state;

    axios
      .delete(`${API_URL}keranjangs/${keranjangDetail.id}`)
      .then(() => {
        Swal.fire({
          title: "Hapus Pesanan",
          text: "Pesanan berhasil dihapus!",
          icon: "success",
        });
        this.handleClose();
        this.props.refreshData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const {keranjangs} = this.props;
    const {showModal, keranjangDetail, jumlah, keterangan, totalHarga} =
      this.state;

    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length > 0 ? (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menukeranjang) => (
                <ListGroup.Item
                  key={menukeranjang.id}
                  onClick={() => this.handleShow(menukeranjang)}
                >
                  <Row>
                    <Col xs={2}>
                      <h4>
                        <Badge pill bg="success">
                          {menukeranjang.jumlah}
                        </Badge>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{menukeranjang.product.nama}</h5>
                      <p>Rp. {numberWithCommas(menukeranjang.product.harga)}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        ) : (
          <p>Keranjang kosong</p>
        )}

        <ModalKeranjang
          showModal={showModal}
          handleClose={this.handleClose}
          keranjangDetail={keranjangDetail}
          jumlah={jumlah}
          keterangan={keterangan}
          tambah={this.tambah}
          kurang={this.kurang}
          changeHandler={this.changeHandler}
          handleSubmit={this.handleSubmit}
          hapusPesanan={this.hapusPesanan}
          totalHarga={totalHarga}
        />

        <TotalBayar keranjangs={keranjangs} />
      </Col>
    );
  }
}
