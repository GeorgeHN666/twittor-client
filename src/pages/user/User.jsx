import React,{useState,useEffect} from 'react'
import {Button,Spinner,Container} from 'react-bootstrap';
// This Replace The WithRouter Hook
import { useLocation,useNavigate,useParams} from 'react-router-dom'
import useAuth from '../../hook/useAuth';
import { getUserAPI } from '../../api/User'
import { toast } from 'react-toastify'
import BasicLayout from '../../layout/BasicLayout'
import InfoUser from '../../components/user/infoUser';
import BannerAvatar from '../../components/user/BannerAvatar/BannerAvatar';
import { SeeTweet } from '../../api/tweets'
import ListTweets from '../../components/listTweets'

import './User.scss'

function User(props) {

  const {dataUser , setRefresh} = props;
  const {params} = dataUser;
  const [user,setUser] = useState(null);
  const currentUser = useAuth();
  const [tweets,setTweet] = useState(null);

  const [page,setPage] = useState(1)
  const [loadingTweets,setLoadingTweets] = useState(false)


  useEffect(() => {
    // Here we make the request to the server and store the infoin the Const User
    
    const fetchData = async () => {
      await getUserAPI(params.i).then(response => {
        setUser(response)
        if(!response){
        toast.error("The User Doesn't Exist")
        }
      })
      .catch(() => {
        toast.error("The User Doesn't Exist")
      })
    }

      fetchData()

  },[params])

  useEffect(() => {
    const fetchD = async () => {
      await SeeTweet(params.i,1).then(response => {
        setTweet(response)
      })
      .catch(() => {
        setTweet([])
      })
    }

    fetchD()

  },[params])

  const moreData= () => {
    const pageTemp = page + 1;
    setLoadingTweets(true)
    SeeTweet(params.i,pageTemp).then(response => {
      if(!response) {
        setLoadingTweets(0)
      }else {
        setTweet([...tweets, ...response])
        setPage(pageTemp)
        setLoadingTweets(false)
      }
    })
  }

  return (
    <BasicLayout className="user" setRefresh={setRefresh}>
      <div className="user__title">
        <h2> {user ? `${user.name} ${user.lastN}` : "This User Doesn't Exist" } </h2>
      </div>
      <BannerAvatar user={user} currentUser={currentUser} />
      <InfoUser user={user} />
      <Container className="user__tweets">
        <div className="user__tweets__title">
        <h3>Tweets</h3>
        </div>
        {tweets && <ListTweets tweets={tweets} user={user} currentUser={currentUser} />}  
        <Button onClick={moreData}>
          {!loadingTweets ? (
            loadingTweets !== 0 && 'More Tweets' 
          ): <Spinner as="span" animation="grow" size="sm" role="status" arian-hidden="true" />}  
        </Button>
      </Container>
    </BasicLayout>
  )
}

export default withRouter(User);

function withRouter(Component) {
  function ComponentWithRouter(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    
    return (
      <Component
      {...props}
      dataUser = {{location,navigate,params}}
      />
    );
  }
  return ComponentWithRouter
}