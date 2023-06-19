import React from "react";
import Login from './Login';
import Signup from './Signup';
import FirstPage from "./FirstPage";
import Adminlogin from "./Adminlogin";
import AdminAdd from "./AdminAdd";
import AdminViewJobs from "./AdminViewJobs";
import AdminUpdateJobs from "./AdminUpdateJobs";
import UserViewJobs from "./UserViewJobs";
import UserViewAllJobs from "./UserViewAllJobs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminViewAppliedJobs from "./AdminViewAppliedJobs";
import ForgotPassword from "./ForgotPassword";
import AdminViewApplications from "./AdminViewApplication";
import UserViewApplications from "./UserViewApplications";
import UserUpdateProfile from "./UserUpdateProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />}></Route>
          <Route path="/adminlogin" element={<Adminlogin />}></Route>
          <Route path="/adminviewjobs" element={<AdminViewJobs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/adminadd" element={<AdminAdd />}></Route>
          <Route path="/updatejob" element={<AdminUpdateJobs />}></Route>
          <Route path="/updatejob/:key" element={<AdminUpdateJobs />}></Route>
          <Route path="/userviewjobs/:key" element={<UserViewJobs />}></Route>
          <Route path="/userviewalljobs/:key" element={<UserViewAllJobs />}></Route>
          <Route path="/viewappliedjobs" element={<AdminViewAppliedJobs />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/adminviewapplications/:key" element={<AdminViewApplications />}></Route>
          <Route path="/userviewapplications/:key" element={<UserViewApplications />}></Route>
          <Route path="/userupdateprofile/:key" element={<UserUpdateProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
