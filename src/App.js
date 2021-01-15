import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container } from 'react-bootstrap'
import axios from 'axios'

import Navbar from './components/NavbarComponent'
import Category from './components/ListCategory'
import Hasil from './components/Hasil'
import Menus from './components/Menus'
import { API_URL } from './utils/constants'


export default class index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      menus:[],
    }
  }

  componentDidMount() {
    axios.get(API_URL+"products")
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
  }

  render() {
    const { menus } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="mt-3">
          <Container fluid>
          <Row>
            <Category />
            <Col>
              <h4>Daftar Product</h4>
              <hr />
            <Row>
              {menus && menus.map((menu) => (
                <Menus 
                  key={menu.id}
                  menu={menu}
                />
              ))}
              </Row>
            </Col>
            <Hasil />
          </Row>   
        </Container>
        </div>
      </div>
        
        
      
    );

  }
  }
