import React from 'react'
import { Card, Col } from 'react-bootstrap'
import {numberWithCommas} from '../utils/formatNumber'

const Menus = ({menu}) => {
    return (
        <div>
            <Col md={4} xs={6} className="mb-4">
            <Card style={{ width: '14rem' }} className="shadow">
                <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+ "/" + menu.gambar} />
                <Card.Body>
                    <Card.Title>{menu.nama} <br />
                    <strong>{menu.kode}</strong></Card.Title>
                    <Card.Text>
                    Rp {numberWithCommas(menu.harga)}
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default Menus
