import React,{useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import { API_HOST } from '../../../utils/constans'
import ConfigModal from '../../modal/configModal'
import EditUserForm from '../editUserFrom/EditUserForm'
import NoUser from '../../../assets/png/avatar-no-found.png'
import { checkRelation, followAPI,unFollow } from '../../../api/follows'

import './BannerAvatar.scss'

export default function BannerAvatar(props) {
          //idU , _id 
    const {user,currentUser} = props;
    const bannerURL = user?.banner ? `${API_HOST}/oB?i=${user.idU}` : null;
    const avatarURL = user?.avatar ? `${API_HOST}/oA?i=${user.idU}` : NoUser ;

    const [reload,setReload] = useState(false);

    const [following,setFollowing] = useState(null);

    const [showM,setShowM] = useState(false);

    useEffect(() => {
      if(user) {
        checkRelation(user?.idU).then(response => {
          if(response?.status) {
            setFollowing(true)
          } else {
            setFollowing(false)
          }
        })
      }
      setReload(false)
    },[user,reload])

    const onFollow = () => {
      followAPI(user.idU).then(() => {
        setReload(true)
      })
    }

    const onUnfollow = () => {
      unFollow(user.idU).then(() => {
        setReload(true)
      })
    }

  return (
    <div className='banner-avatar'style={{backgroundImage: `url('${bannerURL}')` }} >
        <div className='avatar' style={{backgroundImage: `url('${avatarURL}')` }} />

        {user && (
          <div className="edit-profile">
            {currentUser._id === user.idU && <Button onClick={() => setShowM(true)}>Edit Profile</Button>}
            
            {currentUser._id !== user.idU && (
              following !== null && (
                (following ? <Button onClick={onUnfollow} className="unfollow" ><span>Following</span></Button> : <Button onClick={onFollow} >Follow</Button>  ) 
                
              )
            )}

          </div>
        )}
        <ConfigModal show={showM} setShow={setShowM} title="Edit Profile" >
          <EditUserForm user={user} setShow={setShowM} />
        </ConfigModal>
    </div>
  )
}
