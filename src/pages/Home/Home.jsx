import React,{useEffect,useState} from 'react'
import './Home.scss'
import BasicLayout from '../../layout/BasicLayout/BasicLayout';
import {Button,Spinner} from 'react-bootstrap'
import { getAllUsersTweets } from '../../api/tweets'
import HomeListTweets from '../../components/HomeListTweets';

import './Home.scss'

export default function Home(props) {
  const {setRefresh} = props;

  

  const [tweets,setTweets] = useState(null)
  const [pg,setPg] = useState(1);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    getAllUsersTweets(pg).then(response => {
      if (!tweets && response ) {
      setTweets(formatModel(response))
      } else {
        if (!response) {
          setLoading(0)
        } else {
          const Data = formatModel(response)
          setTweets([...tweets,...Data])
          setLoading(false)
        }
      }
    }).catch(() => {})
  },[pg])

  const moreData = () => {
    setLoading(true)
    setPg(pg + 1)
  }

  return (
      <BasicLayout className="home" setRefresh={setRefresh} >
        <div className="home__title">
          <h2>Home</h2>  
        </div>
        {tweets && <HomeListTweets tweets={tweets}/> }
        <Button onClick={moreData} className="load-more">
          {!loading ? (
            loading !== 0 ? "See More Tweets" : "There's No More Tweets"
          ) : (
            <Spinner 
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            />
          )}
        </Button>
      </BasicLayout>
    );
};

function formatModel(tweets) {
  const tweetsTemp = [];

  tweets.forEach(tweet => {
    tweetsTemp.push({
      _id :tweet._id ,
      userITweet : tweet.userRelationID,
      messTweet : tweet.Tweet.messTweet,
      dateTweet : tweet.Tweet.dateTweet,
    })
  });
  return tweetsTemp
}
