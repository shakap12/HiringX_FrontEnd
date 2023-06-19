import React from "react";
import { Usersdata, UserUniqueKey } from "./Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [newPassword, changePassword] = useState();
    const [email, changeEmail] = useState();
    function passwordChange(event) {
        changePassword(event.target.value);
    }
    function getEmail(event) {
        changeEmail(event.target.value);
    }


    function SubmitNewPassword() {
        const found = Usersdata.find(obj => {
            return obj.email === email;
        });
        if (typeof (found) === 'object') {
            Usersdata[found.id].password = newPassword;
        }
        else {
            alert("Password Saved");
        }
    }
    const navigate = useNavigate();
    function LoginNavigate() {
        navigate("/login");
    }

    return (
        <>
            <div className='box'>
                <div className='container contbox'>
                    <div className='adminbox'>
                        <div className='intro'><h2>Hey! </h2></div>
                        <div className='heading'>
                            <h4>Enter Your new</h4>
                            <div className='animatetext'>
                                <div><h4>Password</h4></div>
                                <div><h4>$%#@^&</h4></div>
                            </div>
                        </div>
                        <div><input type="email" placeholder='Email    ' className='introinput' onChange={getEmail} autoFocus required ></input></div>
                        <div><input type="password" placeholder='New Password' className='introinput' onChange={passwordChange} required></input></div>
                        <div><button type='submit' className='introbtn' onClick={SubmitNewPassword}>Submit</button></div>
                        <p><a href="#" onClick={LoginNavigate}>Go back to Login In</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ForgotPassword;