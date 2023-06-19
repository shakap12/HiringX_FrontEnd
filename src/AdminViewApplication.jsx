import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AdminViewApplications() {
    const { key } = useParams();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplicationsFromDB(key);
    }, []);
    const navigate = useNavigate();

    function viewAllJobs() {
        navigate("/adminviewjobs")
    }
    function AddJobs() {
        navigate("/adminadd");
    }
    function signout(){
        navigate("/");
    }
    const fetchApplicationsFromDB = async (props) => {
        let jobsFromDB = [];
        try{
        jobsFromDB = await axios.get("http://localhost:8084/user/getapplicationsforjob/" + props);
        console.log("job applicants-", jobsFromDB.status);
        setApplications(jobsFromDB.data);
        }
        catch{
            console.log("no jobs applicants for job id-",props);
            setApplications([]);
        }

    }
    if (applications.length == 0) {
        return (
            <div className="body">
                <div className="container">
                    <div className='navbar'>
                        <h2>HiringX</h2>
                        <div className='buttonbox'>
                            <button type='submit' className='btn3' onClick={viewAllJobs}>View Jobs</button>
                            <button type='submit' className='btn2' onClick={AddJobs}>Add Jobs</button>
                            <button class="btn" onClick={signout}><i class="fa fa-logout btn2">&#xf08b;</i></button>
                        </div>
                    </div>
                    <div className='row my-4 defaultmsg'>
                        <p>No Applicants for Job ID-{key}</p>
                    </div>
                </div>
            </div>

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
                                <button type='submit' className='btn3' onClick={viewAllJobs}>View Jobs</button>
                                <button type='submit' className='btn2' onClick={AddJobs}>Add Jobs</button>
                                <button class="btn" onClick={signout}><i class="fa fa-logout btn2">&#xf08b;</i></button>
                            </div>
                        </div>
                        <div className='row my-4 defaultmsg'>
                            <p>Applicants for Job ID-{key}</p>
                        </div>
                        <div className='row my-4 pb-5'>
                            {
                                applications.map((item) =>
                                    <div className='col-sm-6 col-md-3 col-lg-4'>
                                        <div className="card cardbox">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.userName}</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">User Id-{item.userId}</h6>
                                                <p className="card-text loc">Email-<br />{item.userEmail}</p>
                                                <p className="card-text reqskill">Skills-{item.skill1}, {item.skill2}</p>
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
export default AdminViewApplications
