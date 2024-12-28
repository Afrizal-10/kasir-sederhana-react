import React from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {numberWithCommas} from "../utils/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit,
  hapusPesanan,
  totalHarga,
}) => {
  if (!keranjangDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Data Tidak Tersedia</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tidak ada detail pesanan yang tersedia.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {keranjangDetail.product.nama}{" "}
          <strong>Rp. {numberWithCommas(keranjangDetail.product.harga)}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Total Harga :</Form.Label>
            <p>
              <strong>Rp. {numberWithCommas(totalHarga)}</strong>
            </p>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Jumlah :</Form.Label>
            <br />
            <Button
              variant="primary"
              size="sm"
              className="me-2"
              onClick={kurang}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <strong>{jumlah}</strong>
            <Button
              variant="primary"
              size="sm"
              className="ms-2"
              onClick={tambah}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Keterangan :</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="keterangan"
              placeholder="Contoh: Pedas, Nasi Setengah"
              value={keterangan}
              onChange={changeHandler}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={hapusPesanan}>
          <FontAwesomeIcon icon={faTrash} className="me-1" />
          Hapus Pesanan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalKeranjang;
