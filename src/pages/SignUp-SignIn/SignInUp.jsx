import React, {useState} from 'react'
import './SignInUp.scss'
import {Container,Col,Row,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faUsers,faComment } from '@fortawesome/free-solid-svg-icons'
import BasicModal from '../../components/modal/BasicModal/index';
import SignUpForm from '../../components/forms/SignUpFrom';
import SignInForm from '../../components/forms/SignInForm';
import LogoWhite from '../../assets/png/logo-white.png';
import Logo from '../../assets/png/logo.png';

export default function SignInUp(props) {

    const {setRefresh} = props; 

    const [showModal, setShowModal] = useState(false);
    const [contentM,setContentM] = useState(null);

    const openModal = content => {
        setShowModal(true);
        setContentM(content);
    }


    return (
        <>
        <Container className="signin-up" fluid >
            <Row>
                <LeftC/>
                <RightC openModal = {openModal} setModal={setShowModal} setRefresh={setRefresh}/>
            </Row>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal}>
            {contentM}
        </BasicModal>
        </>
    );
}

function LeftC() {
    return(
        <Col className="signin-up__left" xs={6}>
            <img src={Logo} alt="twittor-logo" />

            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch}/>
                     Discover The Another world</h2>
                <h2>
                <FontAwesomeIcon icon={faUsers}/>
                    Discover what people are saying</h2>
                <h2>
                <FontAwesomeIcon icon={faComment}/>
                    C'mon Join Us It Will Be Fun!!</h2>
            </div>
        </Col>
    );
}

function RightC(props) {

    const {openModal,setModal,setRefresh} = props

    return(
        <Col className="signin-up__right" xs={6}>
            <div>
                <img src={LogoWhite} alt="twittor-logo-white"/>

                <h2>Look What Is Happening In The World!!</h2>
                <h3>Sign Up To Twittor Right Now !!</h3>
                <Button 
                variant="primary" 
                onClick={() => openModal(<SignUpForm setModal={setModal} />)}>
                    Sign Up!!
                </Button>
                <Button 
                variant="outline-primary" 
                onClick={() => openModal(<SignInForm setRefresh={setRefresh}/>)}>
                    Login!!
                </Button>
            </div>
        </Col>
    );
}