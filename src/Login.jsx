import { Axios } from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export let Usersdata = [];
export let UserUniqueKey = 0;
console.log("usersdata-", Usersdata);
function Login() {
    const [email, emailChange] = useState();
    const [password, passwordChange] = useState();


    function changeEmail(event) {
        emailChange(event.target.value);
    }
    function changePassword(event) {
        passwordChange(event.target.value);
    }
    const navigate = useNavigate();

    const submit = async (event) => {
        event.preventDefault();
        try {
            let userReturned = await axios.get("http://localhost:8084/user/getbyemail/" + email);
            if (userReturned.status == 200) {
                console.log(userReturned.data);
                navigate("/userviewjobs/" + userReturned.data.userId)
            }
        }
        catch{
            alert("Please enter correct Email/Password OR Sign UP");
        }
        
    }
    function signup() {
        navigate("/signup");
    }
    function ForgotPassword() {
        navigate("/forgotpassword");
    }
    return (
        <>
            <div className="body">
                <section className='Form my-4 mx-5'>
                    <div className='container'>
                        <div className='row gx-0'>
                            <div className='col-lg-4'>
                                <img src="https://heroes4change.com/wp-content/uploads/2020/10/Photo-by-Godisable-Jacob-min-1021x1536.jpg" className='img-fluid' alt="my icon"></img>
                            </div>
                            <div className='col-lg-8 px-5 pt-5' align='center'>
                                <h1 className='font-weight-bold py-3'>Welcome to HIRINGX</h1>
                                <h4>Sign into your account</h4>
                                <form onSubmit={submit}>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <input type="email" placeholder="Email" className='form-control my-3 p-4' onChange={changeEmail} autoFocus required></input>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <input type="password" placeholder="Password" className='form-control my-3 p-4' onChange={changePassword} required></input>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <button type='submit' className='btn1 mt-3 mb-5'>Login</button>
                                        </div>
                                    </div>
                                    <a href='#' onClick={ForgotPassword}>Forgot Password?</a>
                                    <p>Don't have an account?<a href='#' onClick={signup}>Register here</a></p>

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )

}
export default Login;