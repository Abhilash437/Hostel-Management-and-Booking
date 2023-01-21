import React from 'react';
import Navbar from './component/Navbar';
import { Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Profile from './component/Profile';
import RegStudents from './component/RegStudents';
import AddRoom from './component/AddRoom';
import BookHostel from './component/BookHostel';
import StudentDetails from './component/StudentDetails';
import RoomDetails from './component/RoomDetails';
import UpdateRooms from './component/UpdateRooms';
import DeleteRooms from './component/DeleteRooms';
import UpdateStudents from './component/UpdateStudents';
import DeleteStudent from './component/DeleteStudent';
import './App.css';
import AddStaff from './component/AddStaff';
import StaffDetails from './component/StaffDetails';
import UpdateStaffs from './component/UpdateStaffs';
import DeleteStaffs from './component/DeleteStaffs';

const App = () => {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path ="/" component={Home}/>
      <Route exact path ="/login" component={Login}/>
      <Route exact path ="/register" component={Register}/>
      <Route exact path ="/profile" component={Profile}/>
      <Route exact path = "/registerStudents" component={RegStudents}/>
      <Route exact path = "/addRoom" component={AddRoom}/>
      <Route exact path = "/bookHostel" component={BookHostel}/>
      <Route exact path = "/studentDetails" component={StudentDetails}/>
      <Route exact path = "/roomDetails" component={RoomDetails}/>
      <Route exact path = "/updateRoom" component={UpdateRooms}/>
      <Route exact path = "/updateStudent" component={UpdateStudents}/>
      <Route exact path = "/deleteStudent" component={DeleteStudent}/>
      <Route exact path = "/deleteRoom" component={DeleteRooms}/>
      <Route exact path = "/addStaff" component={AddStaff}/>
      <Route exact path = "/staffDetails" component={StaffDetails}/>
      <Route exact path = "/updateStaff" component={UpdateStaffs}/>
      <Route exact path = "/deleteStaff" component={DeleteStaffs}/>
    </Switch>
     

    </>
  )
}

export default App;



