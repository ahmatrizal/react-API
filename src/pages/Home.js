import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container } from 'react-bootstrap'
import axios from 'axios'

import Category from '../components/ListCategory'
import Hasil from '../components/Hasil'
import Menus from '../components/Menus'
import TotalBayar from '../components/TotalBayar'

import { API_URL } from '../utils/constants'
import swal from 'sweetalert'


export default class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      menus:[],
      categoriAktif : "Makanan",
      keranjangs : []
      
    }
  }

  componentDidMount() {
    //Product by Category
    axios.get(API_URL+"products?category.nama="+this.state.categoriAktif)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })

    //KeranjangBelanja
    axios.get(API_URL+"keranjangs")
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
  }

  componentDidUpdate (prevState) {
      if (this.state.keranjangs !== prevState.keranjangs){
        axios.get(API_URL+"keranjangs")
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      }

    }

  changeCategori = (value) => {
    this.setState({
      categoriAktif : value,
      menus : []
    })
    axios.get(API_URL+"products?category.nama=" + value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
  }

  inputKeranjang = (value) => {

    axios.get(API_URL+"keranjangs?product.id=" + value.id)
      .then((res) => {
        if ( res.data.length === 0) {
          const keranjangBelanja = {
            jumlah : 1,
            total_harga : value.harga,
            product : value
          }

          axios.post(API_URL+"keranjangs" , keranjangBelanja)
            .then((res)=> {
              swal({
                title: "Success!",
                text: keranjangBelanja.product.nama + " in to ShoppingChard!",
                icon: "success",
                button: false,
                timer: 2000
      });
      })
        } else {
           const keranjangBelanja = {
            jumlah : res.data[0].jumlah + 1,
            total_harga : res.data[0].total_harga + value.harga,
            product : value
          }
          axios.put(API_URL+"keranjangs/" + res.data[0].id , keranjangBelanja)
            .then((res) => {
              swal({
                title: "Success!",
                text: keranjangBelanja.product.nama + " One Again in to ShoppingChard!",
                icon: "success",
                button: false,
                timer: 2000
      });
      })
      }})
      }

    
  

  render() {
    const { menus, categoriAktif, keranjangs } = this.state;
    return (
        <div className="mt-3">
          <Container fluid>
          <Row>
            <Category changeCategori={this.changeCategori} categoriAktif={categoriAktif} />
            <Col>
              <h4>Menu Product</h4>
              <hr />
            <Row>
              {menus && menus.map((menu) => (
                <Menus 
                  key={menu.id}
                  menu={menu}
                  inputKeranjang={this.inputKeranjang}
                />
              ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} />
            
          </Row> 
          <Row>
            <TotalBayar keranjangs={keranjangs} {...this.props}/>
            </Row>  
        </Container>
        </div>
        
        
      
    );

  }
  }
