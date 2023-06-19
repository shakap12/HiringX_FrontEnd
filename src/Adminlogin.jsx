import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import './Adminlogin.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const key = "1234";
function Adminlogin() {
    const [newkey, changeKey] = useState("");
    const navigate = useNavigate();
    function adminSignin() {
        if (newkey == key) {
            navigate("/adminadd");
        }
        else {
            alert("Enter Correct Key")
        }
    }
    function adminkey(event) {
        changeKey(event.target.value);
    }
    return (
        <>
            <div className='box'>
                <div className='container contbox'>
                    <div className='adminbox'>
                        <div className='intro'><h2>Hey Admin! Welcome</h2></div>
                        <div className='heading'>
                            <h4>Enter Your</h4>
                            <div className='animatetext'>
                                <div><h4>PassKey</h4></div>
                                <div><h4>$%#@^&</h4></div>
                            </div>
                        </div>
                        <div><input type="password" placeholder='Passkey    ' className='introinput' onChange={adminkey} autoFocus required></input></div>
                        <div><button type='submit' className='introbtn' onClick={adminSignin}>Submit</button></div>
                    </div>
                </div>
            </div>
        </>);
}
export default Adminlogin;