import React, {useState} from 'react'
import './SignInForm.scss'
import {Form,Button,Spinner} from 'react-bootstrap'
import {values,size} from 'lodash'
import {toast} from 'react-toastify'
import {isEmailValid} from '../../../utils/validations'
import {LoginAPI,setTokenAPI} from '../../../api/auth'

export default function SignInForm(props) {
    const {setRefresh} = props;

    // Here we set the state for the form 
    const [form,setForm] = useState(initialFormValue())

    const [spinner,setSpinner] = useState(false)
    
    // Here we store the values on the form and send it to our model
        const onChange = e => {
            setForm({...form,[e.target.name]: e.target.value})
        }

        // here we create a constant that if something changes in the form it will do something
    const onSubmit = event => {
        event.preventDefault();

        // Here we make sure the fields of our form are filled 
        let validC = 0;
        values(form).some(value => {
            value && validC++
            return null;
        })

        // Here we do more validations
        if (size(form) !== validC) {
            toast.warning("All The fields Must Be Filled to Continue!!");
        }else{
            if(!isEmailValid(form.email)) {
                toast.warning("The Email is Invalid")
            }else{
                setSpinner(true)
                LoginAPI(form).then(response => {
                    if(response.message) {
                        toast.warning(response.message)
                    }else{
                        setTokenAPI(response.token)
                        toast.success("Welcome!!")
                        setRefresh(true)
                    }
                }).catch(() => {
                    toast.error("Server Error, Try Again Later")
                }).finally(() => {
                    setSpinner(false)
                })
            }
        }
    }


  return (
    <div className="signin">
        <h2>Login In To Your Account!!</h2>
        <Form onSubmit={onSubmit} onChange={onChange}>
            <Form.Group>
                <Form.Control defaultValue={form.email} name="email" type="email" placeholder="Email"/>
            </Form.Group>

            <Form.Group>
                <Form.Control type="password" placeholder="Password"  defaultValue={form.pass} name="pass"/>
            </Form.Group>

                <Button type="submit" variant="primary">{!spinner ? "Login" : <Spinner animation="border"/>}</Button>

        </Form>
    </div>
  )
}

function initialFormValue() {
    return {
        email : "",
        pass : "" ,
    }
}