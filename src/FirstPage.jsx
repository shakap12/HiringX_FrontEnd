import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import './FirstPage.css';
import { useNavigate } from 'react-router-dom';

function FirstPage() {
    const navigate=useNavigate();
    function signin(){
        navigate("/Login");
    }
    function adminLogin(){
        navigate("/adminlogin")
    }
    return (
        <>
            <div className='firstbox'>
                <div className="container firstcontbox">
                    <div className='row'>
                        <div className="col-6 border-0 firstcol1">
                            <h1>Welcome to HIRINGX</h1>
                            <h1>Where Talent,</h1>
                            <h1>Meets Opportunity</h1>
                            <h1>Find yourself a job,</h1>
                            <div className='title'>
                            <h1>With preferred </h1>
                            <div className='slider'>
                                <div><h2>location</h2></div>
                                <div><h2>skills</h2></div>
                                <div><h2>position</h2></div>
                                <div><h2>position</h2></div>
                                <div><h2>position</h2></div>
                            </div>
                            </div>
                        </div>
                        <div className="col-6 border-0 firstcol2">
                            <div className='button1'>
                                <label><h5>Already a returning user? Sign in!</h5></label>
                                <button type="submit" onClick={signin}>Sign in</button>
                            </div>
                            <div className='button2'>
                                <label><h5>For Admin Login!</h5></label>
                                <button type='submit' onClick={adminLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FirstPage;