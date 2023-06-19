import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserUpdateProfile() {

    const [user, setUser] = useState([]);
    const { key } = useParams();

    useEffect(() => {
        fetchUserFromDB(key);
    }, []);

    const fetchUserFromDB = async (key) => {
        let userToBeUpdated = [];
        userToBeUpdated = await axios.get("http://localhost:8081/user/get/" + key);
        setUser(userToBeUpdated.data);
    }

    const [newName, nameUpdate] = useState(user.userName);
    const [newEmail, emailUpdate] = useState(user.userEmail);
    const [skill1, skill1Update] = useState(user.skill1);
    const [skill2, skill2Update] = useState(user.skill2);
    const [btntext, changebtntext] = useState("Save the changes");

    function updateName(event) {
        nameUpdate(event.target.value);
    }
    function updateEmail(event) {
        emailUpdate(event.target.value);
    }
    function updateSkill1(event) {
        skill1Update(event.target.value);
    }
    function updateSkill2(event) {
        skill2Update(event.target.value);
    }
    const updateUser = async (event) => {
        event.preventDefault();
        let userObj = {
            userId: key,
            userName: newName,
            userEmail: newEmail,
            skill1: skill1,
            skill2: skill2
        }
        console.log("updated user obj", userObj);
        try {
            await axios.put("http://localhost:8081/user/put", userObj);
        }
        catch {
            alert("Enter Correct Details");
        }
    }
    const navigate = useNavigate();
    function view() {
        navigate("/userviewalljobs/" + key);
    }
    function viewAllAplications() {
        navigate("/userviewapplications/" + key);
    }
    function signout() {
        navigate("/");
    }


    return (
        <>
            <div className='body'>
                <div className='container'>
                    <div className='navbar'>
                        <h3>HiringX</h3>
                        <div className='buttonbox'>
                            <button type='submit' className='btn3' onClick={view}>View All Jobs</button>
                            <button type='submit' className='btn2' onClick={viewAllAplications}>View Applications</button>
                            <span class="dropdown">
                                <button class="dropbtn">Profile</button>
                                <div class="dropdown-content">
                                    <a href="#">Update Profile</a>
                                    <a href="#" onClick={signout}>Logout</a>
                                </div>
                            </span>
                        </div>
                    </div>
                    <section className='Form my-4 mx-5'>
                        <div className='container'>
                            <div className='row gx-0'>
                                <div className='col-lg-1 bg1'></div>
                                <div className='col-lg-10 px-5 pt-5 bg2' align='center'>
                                    <h3 className='font-weight-bold py-3'>Heyy {user.userName}!</h3>
                                    <div className='adminjob'>
                                        <h5>Update your Profile!!</h5>
                                    </div>
                                    <form onSubmit={updateUser}>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <input type="text" placeholder={user.userName} className='inp form-control my-3 p-4' autoFocus onChange={updateName}></input>
                                            </div>
                                        </div>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <input type="text" placeholder={user.userEmail} className='inp form-control my-3 p-4' onChange={updateEmail}></input>
                                            </div>
                                        </div>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <input type="text" placeholder={user.skill1} className='inp form-control my-3 p-4' onChange={updateSkill1}></input>
                                            </div>
                                        </div>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <input type="text" placeholder={user.skill2} className='inp form-control my-3 p-4' onChange={updateSkill2}></input>
                                            </div>
                                        </div>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <button type='submit' className='btn1 mt-3 mb-5' onClick={() => changebtntext("Profile Updated Successfully")}>{btntext}</button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-lg-1 bg3'></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )

}
export default UserUpdateProfile;