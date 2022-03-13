import React from 'react'
import moment from 'moment'
import localization from 'moment/locale/es-mx'
import { Location, Link, DateBirth } from '../../../utils/Icons'

import './InfoUser.scss'

export default function InfoUser(props) {

    const {user} = props;


  return (
    <div className="info-user">
        <h2 className="name">
            {user?.name} {user?.lastN}
        </h2>
        <p className="email">{user?.email}</p>

        {user?.bio && <div className="bio"><p>{user.bio}</p></div>}

            <div className="more-info">
                {user?.loc && (
                    <p>
                        <Location/>
                        {user.loc}
                    </p>
                )}
                {user?.web && (
                    <a href={user.web} alt={user.web} target="_blank" rel='noopener noreferrer'>
                        <Link/>
                        {user.web}
                    </a>
                )}
                {user?.bDAY && (
                    <p>
                        <DateBirth/>
                    
                        {moment(user.bDAY).local("es",localization).format("LL")}
                                            
                    </p>
                    )}
            </div>

    </div>
  )
}
