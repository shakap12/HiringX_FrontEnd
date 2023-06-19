import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UserViewAllJobs() {
    let { key } = useParams();
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        fetchAllJobs();
    }, []);
    const fetchAllJobs = async () => {
        let allJobs = (await axios.get("http://localhost:8084/jobs/get")).data;
        setJobs(allJobs);
    }
    const applyForJob = async (props) => {
        let mappingObj = {
            userId: key,
            userJobId: props
        }
        await axios.post("http://localhost:8083/userjobmapping/post", mappingObj);
        console.log(props);
        alert("Applied for Job-" + props);
        setJobs(jobs.filter((ele) => ele.jobId != props));
    }
    const navigate = useNavigate();
    function signout() {
        navigate("/");
    }
    function userUpdateProfile() {
        let path = "/userupdateprofile/" + key;
        navigate(path);
    }

    return (
        <>
            <div className='body'>
                <div className='container'>
                    <div className='navbar'>
                        <h2>HiringX</h2>
                        <div className='buttonbox'>
                            <button type='submit' className='btn3' >View All Jobs</button>
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
                            jobs.map((item) =>
                                <div className='col-sm-6 col-md-3 col-lg-4'>
                                    <div className="card cardbox">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.jobTitle}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{item.jobCompany}</h6>
                                            <p className="card-text loc">Job Id.-{item.jobId}</p>
                                            <p className="card-text reqskill">Skills Required-{item.jobRequiredSkill1}, {item.jobRequiredSkill2}</p>
                                            <p className="card-text loc">Location-{item.jobLocation}</p>
                                            <button className='applybtn' onClick={() => applyForJob(item.jobId)}>Apply</button>
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
export default UserViewAllJobs;