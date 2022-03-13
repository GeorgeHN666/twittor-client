import { API_HOST } from '../utils/constans'
import { getTokenAPI } from './auth'

export function checkRelation(id) {
    const URL = `${API_HOST}/cR?i=${id}`

    const params = {
        headers : {
            Authorization: `Bearer${getTokenAPI()}`
        }
    }

    return fetch(URL,params)
    .then(response => {
        return response.json()
    })
    .then(result => {
        return result
    })
    .catch(err => {
        return err
    })

}

export function followAPI(id) {

    const URL = `${API_HOST}/f?i=${id}`

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

export function unFollow(id) {

    const URL = `${API_HOST}/uF?i=${id}`

    const params = {
        method: "DELETE",
        headers : {
            Authorization : `Bearer${getTokenAPI()}`
        }
    }

    return fetch(URL,params) 
    .then(response => {
        return response.json()
    })
    .then(result => {
        return result
    })
    .catch(err => {
        return err
    })

}

export function getUsersListAPI(paramsUrl) {
    const URL = `${API_HOST}/uL?${paramsUrl}`

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