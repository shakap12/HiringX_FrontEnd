import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import './AdminViewJobs.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './AdminUpdateJobs.css';
import { AppliedJobs } from './UserViewJobs';
import axios from 'axios';

function AdminViewJobs() {
    let jobsFromDB = [];
    const [jobs, setJobs] = useState([]);
    const [companyArray, setCompanyArray] = useState([]);
    const [locationArray, setLocationArray] = useState([]);
    useEffect(() => {
        fetchJobsFromDB();
    }, []);
    const fetchJobsFromDB = async () => {
        jobsFromDB = (await axios.get("http://localhost:8082/jobs/get")).data;
        setJobs(jobsFromDB);

        let companies = [];
        companies = await axios.get("http://localhost:8084/jobs/getjobcompanies");
        setCompanyArray(companies.data);
        console.log("company array-->",companyArray);

        let locations = [];
        locations = await axios.get("http://localhost:8084/jobs/getjoblocations");
        setLocationArray(locations.data);
        console.log("location array-->",locationArray);
    }

    const navigate = useNavigate();
    function update(prop) {
        let path = "/updatejob/" + prop;
        navigate(path);
    }
    function add() {
        navigate("/adminadd");
    }
    const [value, setValue] = useState();

    const del = async (props) => {
        await axios.delete("http://localhost:8082/jobs/delete/" + props);
        let leftJobs = [];
        leftJobs = await axios.get("http://localhost:8082/jobs/get");
        setJobs(leftJobs.data);
    }
    const handleCompnay = async (props) => {
        let companyJobs = [];
        companyJobs = await axios.get("http://localhost:8084/jobs/getbycompany/" + props);
        setJobs(companyJobs.data);
    }
    const handleLocation = async (props) => {
        let locationJobs = [];
        locationJobs = await axios.get("http://localhost:8084/jobs/getbylocation/" + props);
        setJobs(locationJobs.data);
    }   
    function viewApplications(props) {
        let path = "/adminviewapplications/" + props;
        navigate(path);
    }
    function viewJobs(){
        let path="/adminviewjobs";
        navigate(path);
    }
    function signout() {
        navigate("/");
    }
    if (jobs.length === 0) {
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
                                <button type='submit' className='btn3'>View Jobs</button>
                                <button type='submit' className='btn2' onClick={add}>Add Jobs</button>
                                <button class="btn"><i class="fa fa-logout btn2" onClick={signout}>&#xf08b;</i></button>
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
    else return (
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
                            <button type='submit' className='btn3'>View Jobs</button>
                            <button type='submit' className='btn2' onClick={add}>Add Jobs</button>
                            <button class="btn"><i class="fa fa-logout btn2" onClick={signout}>&#xf08b;</i></button>
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
                                            <p className="card-text loc">Job Id-{item.jobId}</p>
                                            <p className="card-text reqskill">Skills Required-{item.jobRequiredSkill1}, {item.jobRequiredSkill2}</p>
                                            <p className="card-text loc">Location-{item.jobLocation}</p>
                                            <button className='updatebtn' onClick={() => update(item.jobId)}>UPDATE</button>
                                            <button className='delbtn' onClick={() => del(item.jobId)}>DELETE</button>
                                            <button className='delbtn' onClick={() => viewApplications(item.jobId)}>SEEKERS</button>
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

export default AdminViewJobs;