import React ,{useState} from 'react'
import {Row, Col,Form,Button,Spinner} from 'react-bootstrap'
import {values,size} from 'lodash' 
import { toast }from  'react-toastify';
import { isEmailValid } from '../../../utils/validations'
import {SignUpAPI} from '../../../api/auth'

import './SignUpForm.scss'

export default function SignUpForm(props) {

    const [form,setForm] = useState(initialFormValue());
    const [spin,setSpin] = useState(false);
    const {setModal} = props;

    const onSubmit = e => {
        e.preventDefault();

        let validCount = 0
        values(form).some(value => {
            value && validCount++
            return null
        })

        if (validCount !== size(form)) {
            toast.warning("All The Fields Must Be Filled!!")
        }else{
            if (!isEmailValid(form.email)) {
                toast.warning("Invalid Email")
            }else if(form.pass !== form.repeatPassword){
                toast.warning("The Passwords Must be the same")
            }else if (size(form.pass) < 8 ) {
                toast.warning("The Password Must Contain At Least 8 Characters")
            }else{
                setSpin(true)
                SignUpAPI(form).then(response => {
                    if(response.code) {
                        toast.warning(response.message);
                    }else{
                        toast.success("User Created, Login!!")
                        setModal(false);
                        setForm(initialFormValue())
                    }
                })
                .catch(() =>{
                    toast.error("There was an error withe the server, Try Again Later")
                })
                .finally(() => {
                    setSpin(false)
                });
            }
        }

    }

    const onChange = e => {
        setForm({...form,[e.target.name]: e.target.value})
    }

  return (
    <div className="sign-up">
        <h2>Create New Account</h2>
        <Form onSubmit={onSubmit} onChange={onChange}>

            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control type="text"placeholder="Name" name="name" defaultValue={form.name}/>
                    </Col>

                    <Col>
                        <Form.Control type="text"placeholder="Last Name" name="lastN" defaultValue={form.lastN}/>
                    </Col>



                </Row>
            </Form.Group>

            <Form.Group>
                <Form.Control type="email" placeholder="Email" name="email" defaultValue={form.email} />
            </Form.Group>

            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control type="password" placeholder="Password" name="pass" defaultValue={form.pass}/>

                    </Col>
                    <Col>
                        <Form.Control type="password" placeholder="Repeat Password" name="repeatPassword" defaultValue={form.repeatPassword}/>

                    </Col>
                </Row>
            </Form.Group>

            <Button variant="primary" type="submit"> {!spin ? "Sign Up" : <Spinner animation="border"/>}</Button>
        </Form>
    </div>
  )
}

function initialFormValue() {
    return {
        name :"",
        lastN : "",
        email : "",
        pass : "",
        repeatPassword : "",
    };
}