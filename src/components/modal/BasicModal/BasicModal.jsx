import React from 'react'
import {Modal} from 'react-bootstrap'
import LogoWhite from '../../../assets/png/logo-white.png'

import './BasicModal.scss'

export default function BasicModal(props) {

    const {show,setShow,children} = props;

  return (
    <Modal className="basic-modal" centered onHide={() => setShow(false)} show={show} size="lg">
        <Modal.Header>
            <Modal.Title>
                <img src={LogoWhite} alt="logo-white-twittor"/>
            </Modal.Title>

        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>
  )
}
