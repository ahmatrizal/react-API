import React, { Component } from 'react'
import { Col, Row, ListGroup, Badge, Card } from 'react-bootstrap'
import {numberWithCommas} from '../utils/formatNumber'
import ModalKeranjang from './ModalKeranjang'
import TotalBayar from './TotalBayar'

import { API_URL } from '../utils/constants'
import swal from 'sweetalert'
import axios from 'axios'

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
            keterangan : keranjang.keterangan,
            totalHarga : keranjang.total_harga
        })
    }

    handleClose = () => {
        this.setState({
            showModal : false
        })
    }

    tombolJumlah = () => {
        this.setState({
            jumlah : this.state.jumlah + 1,
            totalHarga : this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    tombolKurang = () => {
        if ( this.state.jumlah !== 1) {
        this.setState({
            jumlah : this.state.jumlah - 1,
            totalHarga : this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
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

        this.handleClose()
       
     const data = {
            jumlah : this.state.jumlah,
            total_harga : this.state.totalHarga,
            product : this.state.keranjangDetail.product,
            keterangan : this.state.keterangan
          }

          axios.put(API_URL+"keranjangs/" + this.state.keranjangDetail.id , data)
            .then((res)=> {
                this.props.getListKeranjang()
              swal({
                title: "Success!",
                text: data.product.nama + " Done to Update",
                icon: "success",
                button: false,
                timer: 2000
      });
    })}

    hapusPesanan = (id) => {

        this.handleClose()
    
          axios.delete(API_URL+"keranjangs/" + id)
            .then((res)=> {
                this.props.getListKeranjang()
              swal({
                title: "Delete!",
                text: this.state.keranjangDetail.product.nama + " Delete",
                icon: "error",
                button: false,
                timer: 2000
      });
    })}

    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} mt='2'>
            <h4>ShoppingCart</h4>
            <hr />
            <Card className="overflow-auto hasil">
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
                hapusPesanan={this.hapusPesanan}
                />
                
                </ListGroup>
                </Card>
                <TotalBayar keranjangs={keranjangs} {...this.props}/>
            </Col>
        )
    }
}
