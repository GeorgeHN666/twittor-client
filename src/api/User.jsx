import {API_HOST} from '../utils/constans';
import {getTokenAPI} from './auth';

export function getUserAPI(i) {
    const url = `${API_HOST}/sP?i=${i}`

    const params = {
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer${getTokenAPI()}`,
        }
    }

    return fetch (url,params)
    .then(response => {
        if (response.status >= 400) throw null // This Is If The User Doesn't Exist
        return response.json();
    })
    .then(result => {
        return result
    })
    .catch(err => {
        return err
    })

}

export function updateBannerAPI(file) {

    const formData = new FormData();
    formData.append("banner",file);

    const URL = `${API_HOST}/uB`

    const params = {
        method : "POST",
        headers: {
            Authorization: `Bearer${getTokenAPI()}`
        },
        body: formData,
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

export function updateAvatarAPI(file) {

    const formData = new FormData();
    formData.append("avatar",file);

    const URL = `${API_HOST}/uA`

    const params = {
        method : "POST",
        headers: {
            Authorization: `Bearer${getTokenAPI()}`
        },
        body: formData,
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

export function modifyProfileAPI(dataa) {
    const URL = `${API_HOST}/mP`

    const params = {
        method : "PUT",
        headers : {
            Authorization : `Bearer${getTokenAPI()}`
        },
        body: JSON.stringify(dataa)
    }

    return fetch(URL,params)
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })

}