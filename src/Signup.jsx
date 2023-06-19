import React, { useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";
import { Usersdata } from "./Login";
import { useNavigate } from "react-router-dom";
import './Signup.css';
import { hasNumber, hasUpperCase, hasLowerCase, hasSpecialCharacter } from './utils.jsx';
import axios, { Axios } from "axios";

function Signup() {
    const [name, changeName] = useState("");
    const [email, changeEmail] = useState("");
    const [skillone, firstSkillChange] = useState("");
    const [skilltwo, secondSkillChange] = useState("");
    const [password,changePassword]=useState("");
    const [btnval, changeBtnVal] = useState("Submit");
    const [progessBarStyle, changeProgessBarStyle] = useState({
        backgroundColor: "green",
        width: '1%',
        borderRadius: '30px'
    });

    function nameChange(event) {
        changeName(event.target.value);
    }
    function emailChange(event) {
        changeEmail(event.target.value);
    }
    function passwordChange(event) {
        const {
            target: {
                value = ''
            }
        } = event;
        changePassword(value);
    }
    useEffect(() => {
        let updatedProgessBarStyle = {
            backgroundColor: 'red'
        }
        let flagUpper = false;
        let flagSpecial = false;
        let flagNumber = false;
        if (password.length > 3) {
            const strengthByLength = Math.min(6, Math.floor(password.length / 4));
            let strengthByCharacter = 0;
            if (hasNumber.test(password)) {

                flagNumber = true;
            }
            if (hasUpperCase.test(password)) {

                flagUpper = true;
            }
            if (hasSpecialCharacter.test(password)) {

                flagSpecial = true;
            }

        }
        if (flagNumber && flagSpecial && flagUpper) {
            updatedProgessBarStyle.width = '100%';
            updatedProgessBarStyle.backgroundColor = 'green';
        }
        else if ((flagNumber && flagSpecial) || (flagSpecial && flagUpper) || (flagUpper && flagNumber)) {
            updatedProgessBarStyle.width = '75%';
            updatedProgessBarStyle.backgroundColor = 'orange';
        }
        else if (flagNumber || flagSpecial || flagUpper) {
            updatedProgessBarStyle.width = '33%';
            updatedProgessBarStyle.backgroundColor = 'red';
        }
        changeProgessBarStyle(updatedProgessBarStyle);
    }, [password]);

    function firstSkill(event) {
        firstSkillChange(event.target.value);
    }
    function secondSkill(event) {
        secondSkillChange(event.target.value);
    }

    const dataentry=async(event)=> {
        event.preventDefault();
        event.target.reset();
        if (hasNumber.test(password) && hasUpperCase.test(password) && hasSpecialCharacter.test(password)) {
            let userObj={
                userName:name,
                userEmail:email,
                skill1:skillone,
                skill2:skilltwo
            }
            await axios.post("http://localhost:8081/user/post",userObj)           
        }
        else {
            alert("Password must contain \nA Lowercase Letter \nAn Uppercase Letter \nA Special Character \nA Number");
        }
    }
    const navigate = useNavigate();
    function signin() {
        navigate("/login")
    }
    function btnValChange() {
        changeBtnVal("Log in again to continue");
    }
    return (
        <>
            <div className="body">
                <section className='Form my-4 mx-5'>
                    <div className='container'>
                        <div className='row gx-0'>
                            <div className='col-lg-1 bg1'></div>
                            <div className='col-lg-10 px-5 pt-5 bg2' align='center'>
                                <h1 className='font-weight-bold py-3'>Welcome!</h1>
                                <h4>Create an account</h4>
                                <form onSubmit={dataentry}>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <input type="text" placeholder="Full Name" className='inp form-control my-3 p-4' onChange={nameChange} autoFocus required></input>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <input type="email" placeholder="Email" className='inp form-control my-3 p-4' onChange={emailChange} required ></input>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7 passwordContainer'>
                                            <input type="password" placeholder="Password" className='inp form-control my-3 p-4' onChange={passwordChange} required></input>
                                            <div className="progess-container">
                                                <div className="progess-bar" style={{ ...progessBarStyle }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5">
                                            <input type="text" placeholder="Skill 1" className="rows1" onChange={firstSkill} required></input>
                                        </div>
                                        <div className="col-5">
                                            <input type="text" placeholder="Skill 2" className="rows2" onChange={secondSkill} required></input>
                                        </div>

                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <input type="text" placeholder="Additional Skills" className='inp form-control my-3 p-4' ></input>
                                        </div>
                                    </div>
                                    <div className='form-row'>
                                        <div className='col-lg-7'>
                                            <button type='submit' className='btn1 mt-3 mb-5' onClick={btnValChange}>{btnval}</button>
                                        </div>
                                    </div>

                                    <p>Already have an account?  <a href='#' onClick={signin}>Login here</a></p>
                                </form>
                            </div>
                            <div className='col-lg-1 bg3'></div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
export default Signup;