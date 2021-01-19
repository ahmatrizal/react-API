import React, { Component } from 'react'
import { Col, Row, ListGroup, Badge } from 'react-bootstrap'
import {numberWithCommas} from '../utils/formatNumber'
import ModalKeranjang from './ModalKeranjang'
import TotalBayar from './TotalBayar'

export default class Hasil extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             showModal : false,
             keranjangDetail : false,
             jumlah : 0,
             keterangan : ''
        }
    }

    handleShow = (keranjang) => {
        this.setState({
            showModal : true,
            keranjangDetail : keranjang,
            jumlah : keranjang.jumlah,
            keterangan : keranjang.keterangan
        })
    }

    handleClose = () => {
        this.setState({
            showModal : false
        })
    }

    tombolJumlah = () => {
        this.setState({
            jumlah : this.state.jumlah + 1
        })
    }

    tombolKurang = () => {
        if ( this.state.jumlah !== 1) {
        this.setState({
            jumlah : this.state.jumlah - 1
        })
    }
    }

    changeHandler = (e) => {
        this.setState({
            keterangan : e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
       
        console.log("oo")
    }

    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} mt='2'>
            <h4>Hasil</h4>
            <hr />
            <ListGroup variant="flush">
                {keranjangs && keranjangs.map((keranjang) => (
                    <ListGroup.Item key={keranjang.id} onClick={() => this.handleShow(keranjang)}>
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

                <ModalKeranjang {...this.state} 
                handleClose={this.handleClose}
                tombolJumlah={this.tombolJumlah} 
                tombolKurang={this.tombolKurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                />
                
                </ListGroup>
                <TotalBayar keranjangs={keranjangs} {...this.props}/>
            </Col>
        )
    }
}
