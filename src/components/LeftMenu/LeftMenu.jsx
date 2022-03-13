import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LogoW from '../../assets/png/logo-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faUser,faUsers,faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { LogOutAPI } from '../../api/auth'
import useAuth from '../../hook/useAuth';
import TweetModal from '../modal/tweetModal'

import './LeftMenu.scss';

export default function LeftMenu(props) {
    const {setRefresh} = props;

    // This Have The Data  Of The User
    const user = useAuth();

    const LogOut = () => {
        LogOutAPI()
        setRefresh(true)
    }

    const [show,setShow] = useState(false);

  return (
    <div className="left-menu">
        <img className="logo" src={LogoW} alt="twittor"/>
    
        <Link to="/">
        <FontAwesomeIcon icon={faHome}/> Home
        </Link>

        <Link to="/users">
        <FontAwesomeIcon icon={faUsers}/> Users
        </Link>

        <Link to={`/${user?._id}`} >
        <FontAwesomeIcon icon={faUser}/> Profile
        </Link>

        <Link to="" onClick={LogOut} >
            <FontAwesomeIcon icon={faPowerOff} /> Logout
        </Link>

        <Button onClick={() => setShow(true)} >Twittoar</Button>

        <TweetModal show={show} setShow={setShow}/>

    </div>
  )
}
