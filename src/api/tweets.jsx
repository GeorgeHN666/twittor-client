import { getTokenAPI } from './auth'
import {API_HOST} from '../utils/constans'

export function AddTweet(message) {

    const URL = `${API_HOST}/t`

    const data = {
        messTweet : message
    }

    const params = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer${getTokenAPI()}` 
        },
        body : JSON.stringify(data)
    }

    return fetch(URL,params)
    .then(response => {
        if(response.status >= 200 && response.status < 300) {
            return {code : response.status, massage: "Tweet Added!!"}
        }
        return {code: 500,message: "server error"}
    })
    .catch(err => {
        return err
    })
}

export function deleteTweet(id) {
    const URL = `${API_HOST}/eT?i=${id}`

    const params = {
        method : "DELETE",
        headers: {
            Authorization : `Bearer${getTokenAPI()}`
        }
    }

    return fetch(URL,params)
    .then(response => {
        return response
    })
    .catch(err => {
        return ErrorEvent
    })

}

export function SeeTweet(id,pg) {

    const URL = `${API_HOST}/rT?i=${id}&pg=${pg}`

    const params = {
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer${getTokenAPI()}`
        },
    }

    return fetch(URL,params)
    .then(response => {
        return response.json()
    })
    .catch(err => {
        return err
    })

}

export function getAllUsersTweets(pg) {

    const URL= `${API_HOST}/rA?pg=${pg}`
    
    const params = {
        headers : {
            Authorization : `Bearer${getTokenAPI()}`
        }
    }

    return fetch(URL,params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result
    })
    .catch(err => {
        return err
    })

}