import React from "react";
import { AppliedJobs } from "./UserViewJobs";
import { useNavigate } from "react-router-dom";

function AdminViewAppliedJobs(){
    const navigate=useNavigate();
    function view(){
        navigate("/adminviewjobs");
    }
    function add(){
        navigate("/adminadd");
    }
    function signout(){
        navigate("/");
    }
    return(
        <>
            <div className='body'>
                <div className='container'>
                    <div className='navbar'>
                        <h2>HiringX</h2>
                        <div className='buttonbox'>
                            <button type='submit' className='btn3' onClick={view}>View Jobs</button>
                            <button type='submit' className='btn2' onClick={add}>Add Jobs</button>
                            <button type='submit' className='btn2' >View Applied Jobs</button>
                            <button class="btn"><i class="fa fa-logout btn2" onClick={signout}>&#xf08b;</i></button>
                        </div>
                    </div>
                    <div className='row my-4 pb-5'>
                        {
                            AppliedJobs.map((item) =>
                                <div className='col-sm-6 col-md-3 col-lg-4'>
                                    <div className="card cardbox">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.applyingUserName}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{item.applyingEmailId}</h6>
                                            <h6 className="card-subtitle mb-2 text-muted">{item.jobTitle}</h6>
                                            <h6 className="card-subtitle mb-2 text-muted">{item.jobId}</h6>
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
export default AdminViewAppliedJobs;