import React,{useState} from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import {Close} from '../../../utils/Icons'
import classNames from 'classnames'
import { AddTweet } from '../../../api/tweets'
import { toast } from 'react-toastify'

import './TweetModal.scss'

export default function TweetModal(props) {

  const { show,setShow } = props;

  const InitialState = ""

  const onSubmit = (e) => {
    e.preventDefault();

    if( message.length > 0 && message.length <= maxLenght ) {
      AddTweet(message).then(response => {
        if(response?.code >= 200 && response?.code < 300 ) {
          toast.success("Tweet Added")
          setShow(false)
          setMessage(InitialState)
          window.location.reload()
        }
      })
      .catch(() => {
        toast.warning("Error Sending The Tweet,Try Again Later!!")
      })
    }

  }

  const [message,setMessage] = useState(InitialState);
  const maxLenght = 280

  return (
    <Modal className="tweet-modal" show={show} onHide={() => setShow(false)} centered size="lg" >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)}/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form  onSubmit={onSubmit} >
          <Form.Control as="textarea" rows="10" placeholder="What Are You Thinking Right Now?" onChange={(e) => setMessage(e.target.value)} />
          <span className={classNames("count",{error: message.length > maxLenght})}>
            {message.length} / 280
          </span>
          <Button type="submit" disabled={ message.length > maxLenght || message.length < 1 } >Twittoar</Button>
        </Form>
      
      </Modal.Body>
    </Modal>
  )
}

