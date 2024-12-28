import React from "react";
import {Col, Button, Card} from "react-bootstrap";
import {numberWithCommas} from "../utils/utils";
const Menus = ({menu, masukkeranjang}) => {
  return (
    <Col md={5} xs={6} className="mb-4">
      <Card
        style={{width: "18rem"}}
        className="shadow"
        onClick={() => masukkeranjang(menu)}
      >
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
        />
        <Card.Body>
          <Card.Title>
            {menu.nama} ({menu.kode})
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
          <Button variant="primary">Pesan</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
