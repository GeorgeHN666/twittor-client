import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Image,Container} from 'react-bootstrap'
import { map } from 'lodash'
import { getUserAPI } from '../../api/User'
import DefaultAvatar from '../../assets/png/avatar-no-found.png';
import { API_HOST } from '../../utils/constans'
import moment from 'moment'
import Linkify from 'linkify-react';

import './HomeListTweets.scss'

export default function HomeListTweets(props) {

    const {tweets} = props;

  return (
    <Container>
        {map(tweets, (tweet,index) => (
            <Tweet key={index} tweet={tweet} />
        ))}
    </Container>
  )
}

function Tweet(props) {

    const {tweet } = props

    const [userInfo,setUserInfo] = useState(null)
    const [avatarURL,setAvatarURL] = useState(null)


    useEffect(() => {

        const fetchData = async () => {
            await getUserAPI(tweet.userITweet).then(response => {
                setUserInfo(response)
    
                setAvatarURL(
                    response?.avatar ? `${API_HOST}/oA?i=${response.idU}` : DefaultAvatar 
                );
    
            })
        }

        fetchData()

    },[tweet])

    return(
        <Container className="tweets" fluid>
                <Image className="ava" src={avatarURL} roundedCircle />

            <Container className="cont" fluid>
                <div className="title">
                        <h1>{userInfo?.name}  {userInfo?.lastN}</h1>
                        <span> {moment(tweet.dateTweet).calendar()} </span>    
                </div>
                <Linkify tagName='p' className="text">
                    {tweet.messTweet}
                </Linkify>
            </Container>
        </Container>
    );

}
