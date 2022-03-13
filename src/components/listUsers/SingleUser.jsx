import React,{useState,useEffect} from 'react'
import { getUserAPI } from '../../api/User'
import { Image } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { API_HOST } from '../../utils/constans'
import AvatarNotFound from '../../assets/png/avatar-no-found.png'
import {Location} from '../../utils/Icons'

import './SingleUser.scss'

export default function SingleUser(props) {
  
  const {user} = props ;

  const [userInfo,setUserInfo] = useState(null)

  useEffect(() => {
    getUserAPI(user.idU).then(response => {
    setUserInfo(response)
    })
  },[user])
  


    return (
      <div className="single-user">
      <Link to={`/${user.idU}`} className="single-user__link" >
        <Image 
        roundedCircle 
        className="mr-3" 
        src={userInfo?.avatar ? 
        `${API_HOST}/oA?i=${user.idU}` 
        : AvatarNotFound }
        alt={`${user.name} ${user.lastN} `}
        />
        <div className="single-user__text">
        <h5> {user.name} {user.lastN} </h5>

        {userInfo?.loc ? (<p> <Location/> {userInfo.loc}</p>) : ("") }
        </div>
      </Link>
      </div>

  )
}
