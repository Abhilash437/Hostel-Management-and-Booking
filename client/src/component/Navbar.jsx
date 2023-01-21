import React,{useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [login, setLogin] = useState(false)

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const checkLogin= async ()=>{
     let val= await axios.get("http://localhost:8000/login");
    setLogin(val.data.login)
  
    }
    checkLogin();
 },[login])
    return (
//         <>
//         <nav className="navbar navbar-expand-lg bg-dark">
//          <div className="container">
//   <NavLink className="navbar-brand text-white" to="/">Navbar</NavLink>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNav">
//     <ul className="navbar-nav ml-auto ">
//       <li className="nav-item active">
//         <NavLink to="/" className="nav-link text-white" >Home </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/registerStudents" className="nav-link text-white" >Register Students </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/bookHostel" className="nav-link text-white" >Book Hostel </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/studentDetails" className="nav-link text-white" >View Students Details </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/addRoom" className="nav-link text-white" >Add Room </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/roomDetails" className="nav-link text-white" >View Room Status </NavLink>
//       </li>
//       <li className="nav-item">
//        {
//          !login ? (
//            <>
//            <NavLink to="/login" className="nav-link text-white" >Login</NavLink>
           
//            </>
//          )
//          :   <NavLink to="/logout" className="nav-link text-white" >LogOut</NavLink>
//        }
//       </li>
      
      
//     </ul>
  
//   </div>
//   </div>
// </nav>
            
            
//         </>

      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand text-white" to="/">Admin Dashboard</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink to="/" className="nav-link text-white" >Home </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/registerStudents" className="nav-link text-white" >Register Students </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/bookHostel" className="nav-link text-white" >Book Hostel </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/addRoom" className="nav-link text-white" >Add Room </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/addStaff" className="nav-link text-white" >Add Staff </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/addMess" className="nav-link text-white" >Add Mess </NavLink>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Student Details
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <NavLink to="/studentDetails" className="dropdown-item">View Students Details </NavLink>
          <NavLink to="/updateStudent" className="dropdown-item">Update Student Details </NavLink>
          <NavLink to="/deleteStudent" className="dropdown-item">Delete Student Details </NavLink>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Room Details
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <NavLink to="/roomDetails" className="dropdown-item">View Room Details </NavLink>
          <NavLink to="/updateRoom" className="dropdown-item">Update Room Details </NavLink>
          <NavLink to="/deleteRoom" className="dropdown-item">Delete Room Details </NavLink>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Staff Details
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <NavLink to="/staffDetails" className="dropdown-item">View Staff Details </NavLink>
          <NavLink to="/updateStaff" className="dropdown-item">Update Staff Details </NavLink>
          <NavLink to="/deleteStaff" className="dropdown-item">Delete Staff Details </NavLink>
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Mess Details
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <NavLink to="/MessDetails" className="dropdown-item">View Mess Details </NavLink>
          <NavLink to="/updateMess" className="dropdown-item">Update Mess Details </NavLink>
          <NavLink to="/deleteMess" className="dropdown-item">Delete Mess Details </NavLink>
        </div>
      </li>
      <li className="nav-item">
        {
        !login ? (
            <>
            <NavLink to="/login" className="nav-link text-white btn btn-primary" >Login</NavLink>
           
            </>
         )
                  :   <NavLink to="/logout" className="nav-link text-white btn btn-primary" >LogOut</NavLink>
        }
       </li>
    </ul>
  </div>
</nav>
      </>
    )
}

export default Navbar;
