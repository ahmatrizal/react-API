import { faPlus, faMinus,faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { numberWithCommas } from '../utils/formatNumber'

const ModalKeranjang = ({ showModal, handleClose, keranjangDetail, jumlah, keterangan, tombolJumlah, tombolKurang, changeHandler, handleSubmit}) => {
    if (keranjangDetail) {

        return (
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.product.nama}
                        <p>Rp {numberWithCommas(keranjangDetail.product.harga)}</p>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group >
                                <Form.Label>Total Harga :</Form.Label>
                                <strong>Rp {numberWithCommas(keranjangDetail.total_harga)}</strong>
                            </Form.Group>
                             <Form.Group >
                                <Form.Label>Jumlah :</Form.Label>
                                <br />
                                    <Button variant="primary" size='sm' className="mr-2" onClick={() => tombolJumlah()}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                    {jumlah}
                                    <Button variant="primary" size="sm" className="ml-2" onClick={() => tombolKurang()}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Keterangan</Form.Label>
                                <Form.Control as="textarea" rows={3} name="keterangan" onChange={changeHandler} placeholder="Contoh: Pedas, Nasi setengah" value={keterangan}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                               <FontAwesomeIcon icon={faSave}/> Save
                            </Button>
                            </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faTrash} /> Delete Order
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }else{
             return (
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        empty
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ModalKeranjang
