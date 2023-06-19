import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserViewApplications() {

    const { key } = useParams();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplicationsFromDB();
    }, []);

    const fetchApplicationsFromDB = async () => {
        let applicationsForAUser = [];

        applicationsForAUser = await axios.get("http://localhost:8082/jobs/getjobsforauser/" + key);
        console.log(applicationsForAUser);
        setApplications(applicationsForAUser.data)
    }
    const navigate = useNavigate();
    function userallviewjobs() {
        let path = "/userviewjobs/" + key;
        navigate(path);
    }
    function signout() {
        navigate("/");
    }
    function userUpdateProfile() {
        let path = "/userupdateprofile/" + key;
        navigate(path);
    }
    const withdrawApplication = async (props) => {
        try {
            await axios.delete("http://localhost:8083/userjobmapping/deletemapping/" + props + "/" + key);
            alert("Application Withdrawn!");
            let updatedApplicationArray = [];
            updatedApplicationArray = await axios.get("http://localhost:8082/jobs/getjobsforauser/" + key);
            setApplications(updatedApplicationArray.data);
        }
        catch {
            console.log("Cannot Delete Job");
        }

    }

    if (applications.length != 0) {
        return (
            <>
                <div className='body'>
                    <div className='container'>
                        <div className='navbar'>
                            <h2>HiringX</h2>
                            <div className='buttonbox'>
                                <button type='submit' className='btn3' onClick={userallviewjobs}>View All Jobs</button>
                                <span class="dropdown">
                                    <button class="dropbtn">Profile</button>
                                    <div class="dropdown-content">
                                        <a href="#" onClick={userUpdateProfile}>Update Profile</a>
                                        <a href="#" onClick={signout}>Logout</a>
                                    </div>
                                </span>

                            </div>
                        </div>
                        <div className='row my-4 pb-5'>
                            {
                                applications.map((item) =>
                                    <div className='col-sm-6 col-md-3 col-lg-4'>
                                        <div className="card cardbox">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.jobTitle}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{item.jobCompany}</h6>
                                                <p className="card-text loc">Job Id-{item.jobId}</p>
                                                <p className="card-text reqskill">Skills Required-{item.jobRequiredSkill1}, {item.jobRequiredSkill2}</p>
                                                <p className="card-text loc">Location-{item.jobLocation}</p>
                                                <button className='applybtn' onClick={() => withdrawApplication(item.jobId)}> Withdraw</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>

                </div>

            </>
        )
    }
    else {
        return (
            <>
                <div className='body'>
                    <div className='container'>
                        <div className='navbar'>
                            <h2>HiringX</h2>

                            <div className='buttonbox'>
                                <button type='submit' className='btn3' onClick={userallviewjobs}>View All Jobs</button>
                                <span class="dropdown">
                                    <button class="dropbtn">Profile</button>
                                    <div class="dropdown-content">
                                        <a href="#" onClick={userUpdateProfile}>Update Profile</a>
                                        <a href="#" onClick={signout}>Logout</a>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className='row my-4 defaultmsg'>
                            <p>OOPS! YOU HAVEN'T APPLIED TO ANY JOB YET</p>
                            <p> Apply Soon</p>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}
export default UserViewApplications;