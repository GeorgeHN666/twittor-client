import React,{useState,useEffect} from 'react'
import BasicLayout from '../../layout/BasicLayout'
import {Spinner,ButtonGroup,Button} from 'react-bootstrap'
import { useLocation,useNavigate,useParams } from 'react-router-dom'
import queryString from 'query-string'
import { isEmpty } from 'lodash'
import ListUsers from '../../components/listUsers'
import { useDebouncedCallback } from 'use-debounce'

import { getUsersListAPI } from '../../api/follows'
import './Users.scss'

function Users(props) {

    const {setRefresh, dataUser} = props; 

    const [userss,setUsers] = useState(null)
    
    const params = getUserQuery(dataUser.location);
    
    const [userType,setUserType] = useState(params.c || "follow")

    const [btnLoading, setBtnLoading] = useState(false)

    const onSearch = useDebouncedCallback(value => {
        setUsers(null)
        dataUser.navigate({search : queryString.stringify({...params, sr: value , pg: 1})})
    }, 200);

    useEffect(() => {
        getUsersListAPI(queryString.stringify(params)).then(response => {
            setBtnLoading(false)
            if(params.pg == 1 ) {
                if(isEmpty(response)) {
                    setUsers([])
                } else {
                    setUsers(response)
                }
            }else {
                if(!response) {
                    setBtnLoading(0)
                } else {
                    setUsers([...userss,...response])
                    setBtnLoading(false)
                }
            }
        })
        .catch(() => {
            setUsers([]);
        })
    },[dataUser.location])

    const onChangeType = type => {
        // setUsers(null)
        if(type === "follow") {
            setUserType("follow")
        } else {
            setUserType("new")
        }
        dataUser.navigate({
            search: queryString.stringify({c: type, pg: 1,sr:""})
        })
    }

    const moreData = () => {
        setBtnLoading(true)
        const newPage = parseInt(params.pg) + 1
        dataUser.navigate({
            search: queryString.stringify({...params,pg: newPage})
        })
        
    }



  return (
    <BasicLayout className="users" title="Users" setRefresh={setRefresh} >
        <div className="users__title">
            <h2>Users</h2>
            <input type="text" placeholder='Search User'
            onChange={(e) => onSearch(e.target.value)}
            />   
        </div>
        <ButtonGroup className="users__options">
            
            <Button className={userType === "follow" && "active"} onClick={() => onChangeType("follow")}  >
                Following
            </Button>
        
            <Button  className={userType === "new" && "active"} onClick={() => onChangeType("new")}>
                New Users
            </Button>

        </ButtonGroup>


        {!userss ? (
            <div className="users__loading">
                <Spinner animation="border" variant="info" />
                Loading Users
            </div>
        ) : (
            <>
            <ListUsers userss={userss} />
            <Button onClick={moreData} className="load-more">
                {!btnLoading ? (
                    btnLoading !== 0 && "See More Users"
                ) : (
                    <Spinner 
                    animation="grow"
                    as="span"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                )}
            </Button>
            </>
        )}

    </BasicLayout>
  )
}

export default withRouter(Users)


function withRouter(Component) {
    function ComponentWithRouter(props) {
      let location = useLocation();
      let params = useParams();
      let navigate = useNavigate();
      
      return (
        <Component
        {...props}
        dataUser = {{location,params,navigate}}
        />
      );
    }
    return ComponentWithRouter
}


function getUserQuery(location,params,navigate) {
    const {c = "new", pg = 1, sr = ""} = queryString.parse(location.search)

    return {c,pg,sr}
}
