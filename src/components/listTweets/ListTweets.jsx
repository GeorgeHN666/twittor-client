import React,{useState,useEffect} from 'react'
import { Image,Button,Container } from 'react-bootstrap'
import {map} from 'lodash'
import { getUserAPI } from '../../api/User'
import { deleteTweet } from '../../api/tweets'
import DefaultAvatar from '../../assets/png/avatar-no-found.png';
import { API_HOST } from '../../utils/constans'
import moment from 'moment'
import Linkify from 'linkify-react';


import './ListTweets.scss'

export default function ListTweets(props) {

    const {tweets,currentUser,user} = props;

  return (
    <Container>
        {map(tweets , (tweet,index)  => (
            <Tweet  key={index} tweet={tweet} user={user} currentUser={currentUser} />
        ))}  
    </Container>
  )
}

function Tweet(props) {
    const {tweet,currentUser,user} = props;

    const [userInfo,setUserInfo] = useState(null);
    const [avatarURL,setAvatarURL] = useState(null);


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


        const fetchDelete = async () => {
            await deleteTweet(tweet._id);
            window.location.reload();
        }


    return (
        <Container className="tweet" fluid>
                    <Image className="avatar" roundedCircle src={avatarURL} />   
                    <Container className="container" fluid>
                        <div className="title" >
                            <h1> {userInfo?.name} {userInfo?.lastN} </h1>
                            <p> { tweet?.dateTweet ?  moment(tweet?.dateTweet).calendar() : "" } </p> 
                            
                            {currentUser._id === user.idU ? <Button onClick={fetchDelete}> <span>Delete</span> </Button>: "" }
                        </div>

                        <Linkify tagName="p" className="mess">
                                {tweet.messTweet}
                        </Linkify>
                    </Container>
        </Container>
    );
}


