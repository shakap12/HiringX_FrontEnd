import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import './AdminAdd.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppliedJobs } from './UserViewJobs';
import axios from 'axios';

export const jobs = [];
let key = 0;
function AdminAdd() {
    const [title, changeTitle] = useState("");
    const [company, changeCompany] = useState("");
    const [location, changeLocation] = useState("");
    const [skill_1, changeSkill_1] = useState("");
    const [skill_2, changeSkill_2] = useState("");

    function jobTitleChange(event) {
        changeTitle(event.target.value);
    }
    function companyChange(event) {
        changeCompany(event.target.value);
    }
    function jobLocationChange(event) {
        changeLocation(event.target.value);
    }
    function jobSkill_1Change(event) {
        changeSkill_1(event.target.value);
    }
    function jobSkill_2Change(event) {
        changeSkill_2(event.target.value);
    }

    const submission = async (event) => {
        event.preventDefault();
        event.target.reset();
        const jobObj = {
            jobTitle: title,
            jobLocation: location,
            jobCompany: company,
            jobRequiredSkill1: skill_1,
            jobRequiredSkill2: skill_2
        }
        await axios.post("http://localhost:8082/jobs/post",jobObj);
        alert("Job Posted");
    }
    const navigate = useNavigate();
    function viewjobs() {
        navigate("/adminviewjobs")
    }
    function viewappliedjobs() {
        navigate("/viewappliedjobs");
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
                            <button type='submit' className='btn3' onClick={viewjobs}>View Jobs</button>
                            <button type='submit' className='btn2'>Add Jobs</button>
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
                                        <h5>Add some</h5>
                                        <div className='adminjobslider'>
                                            <div><h5>jobs</h5></div>
                                            <div><h5>positions</h5></div>
                                        </div>
                                    </div>
                                    <form onSubmit={submission}>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <input type="text" placeholder="Job Title" className='inp form-control my-3 p-4' onChange={jobTitleChange} required autoFocus></input>
                                            </div>
                                        </div>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <input type="text" placeholder="Job Company" className='inp form-control my-3 p-4' onChange={companyChange}></input>
                                            </div>
                                        </div>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <input type="text" placeholder="Location" className='inp form-control my-3 p-4' onChange={jobLocationChange}></input>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className='col-2 '></div>

                                            <input type="text" placeholder="Required Skill 1" className="col-4 skillcol" onChange={jobSkill_1Change} required></input>
                                            <input type="text" placeholder="Required Skill 2" className="col-4 skillcol" onChange={jobSkill_2Change} required></input>

                                            <div className='col-2'></div>

                                        </div>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <input type="text" placeholder="Previous Experiences" className='inp form-control my-3 p-4' ></input>
                                            </div>
                                        </div>
                                        <div className='form-row'>
                                            <div className='col-lg-7'>
                                                <button type='submit' className='btn1 mt-3 mb-5'>Begin Hiring!</button>
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
    );
}
export default AdminAdd;
