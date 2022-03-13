import {API_HOST, TOKEN} from '../utils/constans'
import jwtDecode from 'jwt-decode'

export function SignUpAPI(user) {    
    const URL = `${API_HOST}/sU`

    const finalUser = {
        ...user,
        email: user.email.toLowerCase(),
        bDay : new Date()
    };
    delete finalUser.repeatPassword

    const params = {
        method :"POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(finalUser)
    };

    return fetch(URL,params).then(response => {
        if(response.status >= 200 && response.status <300){
            return response.json();
        }
        return {code : 404, message:"Another Account Alredy Have This User"}
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    })

}

export function LoginAPI(user) {
    // Here we make a constant with the api host 
    const URL = `${API_HOST}/l`

    // Here we set the data that we want to sen and store it in a constant
    const data = {
        ...user,
        email : user.email.toLowerCase(),
        pass : user.pass
    }

    // Here we set the params for the URL 
    const params = {
        method:"POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    };

    // Here we fetch/Feed the data and do some validations
    return fetch(URL,params).then(response => {
        if(response.status >= 200 && response.status < 300){
            return response.json();
        }

        return{message:"Invalid Email or Password"}
    })
    .then(result => {
        return result
    })
    .catch(err => {
        return err
    })
}

export function setTokenAPI(token) {
    localStorage.setItem(TOKEN,token);

}

export function getTokenAPI() {
    return localStorage.getItem(TOKEN);
}

export function LogOutAPI() {
    localStorage.removeItem(TOKEN) ;
}

export function isUserLogAPI() {
    const token = getTokenAPI();

    if (!token) {
        LogOutAPI();
        return null;
    }

    if (isExpired(token)){
        LogOutAPI()
    }
    return jwtDecode(token);

}

export function isExpired(token) {

const {exp} = jwtDecode(token)
const expire = exp*1000;
const timeout = expire - Date.now();

if (timeout < 0) {
    return true
}else{
    return false
}

}