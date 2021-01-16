import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

import { API_URL } from '../utils/constants'
import axios from 'axios'

const Icon = ({ nama }) => {
    
    if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-1"/>
    if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />

    return <FontAwesomeIcon icon={["faUtensils"]} className="mr-2"/>
}
export default class ListCategory extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             categories:[],
        }
    }

    componentDidMount() {
    axios.get(API_URL+"categories")
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
  }
    

    render() {

        const { categories } = this.state
        const {changeCategori, categoriAktif } = this.props
        return (
            <Col md={2} mt='2'>
            <h4>Category</h4>
            <hr />
            <ListGroup>
            {categories && categories.map((categori) => (
                <ListGroup.Item 
                key={categori.id} 
                onClick={() => changeCategori(categori.nama)}
                className = {categoriAktif === categori.nama && "categori-aktif" }
                style = {{cursor : 'pointer'}}
                >
                    <Icon nama={categori.nama} />
                    {categori.nama}
                    </ListGroup.Item>

            )) }
            </ListGroup>
            </Col>
        )
    }
}
