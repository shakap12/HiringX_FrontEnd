import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AdminUpdateJobs() {

    const [jobs, setJobs] = useState([]);
    const { key } = useParams();

    useEffect(() => {
        fetchJobFromDB(key);
    }, []);

    const fetchJobFromDB = async (key) => {
        let jobToBeUpdated = [];
        jobToBeUpdated = await axios.get("http://localhost:8084/jobs/get/"+key);
        setJobs(jobToBeUpdated.data);
    }

    const [newTitle, titleUpdate] = useState(jobs.jobTitle);
    const [newCompany, companyUpdate] = useState(jobs.jobCompany);
    const [newloc, locUpdate] = useState(jobs.jobLocation);
    const [newskill_1, skill_1Update] = useState(jobs.jobRequiredSkill1);
    const [newskill_2, skill_2Update] = useState(jobs.jobRequiredSkill2);
    const [btntext, changebtntext] = useState("Save the changes");

    function updateTitle(event) {
        titleUpdate(event.target.value);
    }
    function updateCompany(event) {
        companyUpdate(event.target.value);
    }
    function updateLoc(event) {
        locUpdate(event.target.value);
    }
    function updateSkill_1(event) {
        skill_1Update(event.target.value);
    }
    function updateSkill_2(event) {
        skill_2Update(event.target.value);
    }
    const updateJob=async(event)=> {
        event.preventDefault();
        let jobObj={
            jobId:key,
            jobCompany:newCompany,
            jobLocation:newloc,
            jobRequiredSkill1:newskill_1,
            jobRequiredSkill2:newskill_2,
            jobTitle:newTitle
        }
        console.log("updated job obj",jobObj);
        try{
        await axios.put("http://localhost:8082/jobs/put",jobObj);
        }
        catch{
            alert("Enter Correct Details");
        }
    }
    const navigate = useNavigate();
    function view() {
        navigate("/adminviewjobs");
    }
    function add() {
        navigate("/adminadd");
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
                                <button type='submit' className='btn3' onClick={view}>View Jobs</button>
                                <button type='submit' className='btn2' onClick={add}>Add Jobs</button>
                                <button class="btn"><i class="fa fa-logout btn2" onClick={signout}>&#xf08b;</i></button>
                            </div>
                        </div>
                        <section className='Form my-4 mx-5'>
                            <div className='container'>
                                <div className='row gx-0'>
                                    <div className='col-lg-1 bg1'></div>
                                    <div className='col-lg-10 px-5 pt-5 bg2' align='center'>
                                        <h3 className='font-weight-bold py-3'>Heyy Admin!</h3>
                                        <div className='adminjob'>
                                            <h5>Update the credentials of selected job with ID-{key}!</h5>
                                        </div>
                                        <form onSubmit={updateJob}>
                                            <div className='form-row'>
                                                <div className='col-lg-7'>
                                                    <input type="text" placeholder={jobs.jobTitle} className='inp form-control my-3 p-4' autoFocus onChange={updateTitle}></input>
                                                </div>
                                            </div>
                                            <div className='form-row'>
                                                <div className='col-lg-7'>
                                                    <input type="text" placeholder={jobs.jobCompany} className='inp form-control my-3 p-4' onChange={updateCompany}></input>
                                                </div>
                                            </div>
                                            <div className='form-row'>
                                                <div className='col-lg-7'>
                                                    <input type="text" placeholder={jobs.jobLocation} className='inp form-control my-3 p-4' onChange={updateLoc}></input>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className='col-2 '></div>

                                                <input type="text" placeholder={jobs.jobRequiredSkill1} className="col-4 skillcol" onChange={updateSkill_1} ></input>
                                                <input type="text" placeholder={jobs.jobRequiredSkill2} className="col-4 skillcol" onChange={updateSkill_2}></input>

                                                <div className='col-2'></div>

                                            </div>
                                            <div className='form-row'>
                                                <div className='col-lg-7'>
                                                    <input type="text" placeholder="Previous Experiences" className='inp form-control my-3 p-4' ></input>
                                                </div>
                                            </div>
                                            <div className='form-row'>
                                                <div className='col-lg-7'>
                                                    <button type='submit' className='btn1 mt-3 mb-5' onClick={() => changebtntext("Click on View Jobs to see the changes")}>{btntext}</button>

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
export default AdminUpdateJobs;