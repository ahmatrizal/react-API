import React, { Component } from 'react'
import { Col, Row, ListGroup, Badge } from 'react-bootstrap'
import {numberWithCommas} from '../utils/formatNumber'

export default class Hasil extends Component {
    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} mt='2'>
            <h4>Hasil</h4>
            <hr />
            <ListGroup variant="flush">
                {keranjangs && keranjangs.map((keranjang) => (
                    <ListGroup.Item>
                        <Row>
                            <Col md={1}>
                            <Badge pill variant="info">
                                {keranjang.jumlah}
                            </Badge>
                            </Col>
                            <Col>
                            {keranjang.product.nama} <br/>
                            <small>Rp {numberWithCommas(keranjang.product.harga)}</small>
                            </Col>
                            <Col>
                            <strong className="float-right">Rp {numberWithCommas(keranjang.total_harga)}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
                
                </ListGroup>
            </Col>
        )
    }
}
