import React from 'react'
import { map, isEmpty } from 'lodash'
import SingleUser from './SingleUser'

import './ListUsers.scss'

export default function ListUsers(props) {

    const {userss} = props;


    if(isEmpty(userss)) {
        return <h2>Not Users Found!!</h2>
    }


  return (
    <ul className="list-user">
        {map(userss, user => (
            <SingleUser key={user.idU} user={user}  />
        ))}    
    </ul>
  )
}

