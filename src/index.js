import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container } from 'react-bootstrap'


import Navbar from './components/NavbarComponent'
import Category from './components/ListCategory'
import Hasil from './components/Hasil'

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <div className="mt-3">
      <Container fluid>
      <Row>
        <Category />
        <Col>
          <h4>Daftar Product</h4>
          <hr />
        </Col>
        <Hasil />
      </Row>   
    </Container>
    </div>
    
  </React.StrictMode>,
  document.getElementById('root')
);

