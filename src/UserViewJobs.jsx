import React, { useEffect, useState } from "react";
import { jobs } from './AdminAdd';
import { Usersdata } from "./Login";
import { useNavigate, useParams } from "react-router-dom";
import './UserViewJobs.css';
import axios from "axios";

export const AppliedJobs = [];
function UserViewJobs() {
    const [finalJobs, setFinalJobs] = useState([]);
    const [companyArray, setCompanyArray] = useState([]);
    const [locationArray, setLocationArray] = useState([]);

    const [applyBtnValue, changeApplyBtnValue] = useState("Apply");
    let { key } = useParams();
    useEffect(() => {
        jobsForUser();
    }, []);
    const jobsForUser = async () => {
        let userReturned = await axios.get("http://localhost:8081/user/get/" + key);
        let skill1 = userReturned.data.skill1;
        let skill2 = userReturned.data.skill2;
        let jobsWithSkill1 = [];
        let jobsWithSkill2 = [];
        try {
            jobsWithSkill1 = await axios.get("http://localhost:8084/jobs/getbyskill/" + skill1);
            setFinalJobs(jobsWithSkill1.data);
        } catch (error) {
            console.log("error found in skill 1");
        }

        try {
            jobsWithSkill2 = await axios.get("http://localhost:8084/jobs/getbyskill/" + skill2);
            setFinalJobs([...jobsWithSkill1.data, ...jobsWithSkill2.data]);
        }
        catch {
            console.log("error in skill2");
        }
        let companies = [];
        companies = await axios.get("http://localhost:8084/jobs/getjobcompanies");
        setCompanyArray(companies.data);

        let locations = [];
        locations = await axios.get("http://localhost:8084/jobs/getjoblocations");
        setLocationArray(locations.data);
    }
    const navigate = useNavigate();

    function userallviewjobs() {
        navigate("/userviewalljobs/" + key);
    }
    function signout() {
        navigate("/");
    }
    const handleCompnay = async (props) => {
        console.log("navigate to ", props, " jobs");
        let companyJobs = [];
        companyJobs = await axios.get("http://localhost:8084/jobs/getbycompany/" + props);
        setFinalJobs(companyJobs.data);
    }
    const handleLocation = async (props) => {
        console.log("locations-", props);
        let locationJobs = [];
        locationJobs = await axios.get("http://localhost:8084/jobs/getbylocation/" + props);
        setFinalJobs(locationJobs.data);
    }
    const applyForJob = async (props) => {
        let mappingObj = {
            userId: key,
            userJobId: props
        }
        await axios.post("http://localhost:8083/userjobmapping/post", mappingObj);
        alert("Applied for Job-" + props);
        setFinalJobs(finalJobs.filter((ele) => ele.jobId != props));

    }
    const userViewApplications = async (props) => {
        console.log("naviagte to path--", props);
        let path = '/userviewapplications/' + props;
        navigate(path);
        // let applicationsDForAUser = [];
        // applicationsDForAUser = await axios.get("http://localhost:8082/jobs/getjobsforauser/" + props);
        // setFinalJobs(applicationsDForAUser.data)
    }
    const userUpdateProfile=()=>{
        let path="/userupdateprofile/"+key;
        navigate(path);
    }
    if (finalJobs.length === 0) {
        return (
            <>
                <div className='body'>
                    <div className='container'>
                        <div className='navbar'>
                            <h2>HiringX</h2>

                            <div className='buttonbox'>
                                <button type='submit' className='btn3' onClick={userallviewjobs}>View All Jobs</button>
                                <button type='submit' className='btn3' onClick={() => userViewApplications(key)}>View Applications</button>
                                {/* <button class="btn"><i class="fa fa-logout btn2" onClick={signout}>&#xf08b;</i></button> */}
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
                            <p>OOPS! NO JOBS PRESENT AT MOMENT</p>
                            <p> Visit Again</p>
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



                                <span class="dropdownbtn">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Company
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {
                                            companyArray.map((item) =>
                                                <a class="dropdown-item" href="#" onClick={() => handleCompnay(item)}>{item}</a>
                                            )
                                        }
                                    </div>
                                </span>
                                <span class="dropdownbtn">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Location
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {
                                            locationArray.map((item) =>
                                                <a class="dropdown-item" href="#" onClick={() => handleLocation(item)}>{item}</a>
                                            )
                                        }
                                    </div>
                                </span>
                                <button type='submit' className='btn3' onClick={userallviewjobs}>View All Jobs</button>
                                <button type='submit' className='btn3' onClick={() => userViewApplications(key)}>View Applications</button>

                                {/* <button class="btn"><i class="fa fa-logout btn2" onClick={signout}>&#xf08b;</i></button> */}
                                 <span class="dropdown">
                                    <button class="dropbtn">Profile</button>
                                    <div class="dropdown-content">
                                        <a href="#" onClick={userUpdateProfile}>Update Profile</a>
                                        <a href="#" onClick={signout}>Logout</a>
                                    </div>
                                </span>
                                <button class="btn"><i class="fa fa-logout btn2" onClick={signout}>&#xf08b;</i></button>
                            </div>
                        </div>
                        <div className='row my-4 pb-5'>
                            {
                                finalJobs.map((item) =>
                                    <div className='col-sm-6 col-md-3 col-lg-4'>
                                        <div className="card cardbox">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.jobTitle}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{item.jobCompany}</h6>
                                                <p className="card-text loc">Job Id-{item.jobId}</p>
                                                <p className="card-text reqskill">Skills Required-{item.jobRequiredSkill1}, {item.jobRequiredSkill2}</p>
                                                <p className="card-text loc">Location-{item.jobLocation}</p>
                                                <button className='applybtn' onClick={() => applyForJob(item.jobId)}>{applyBtnValue}</button>
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
}

export default UserViewJobs;