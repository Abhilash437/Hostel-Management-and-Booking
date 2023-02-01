import React, { Component } from 'react';
import {Button} from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            usn:"",
            roomNo:0,
            portalStatus:true
        }
    }
    componentDidMount(){
        fetch("http://localhost:8001/home-page",{
            method:"POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                token:window.localStorage.getItem("token")
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"userData");
            this.setState({usn:data.data[0][0].usn});
            this.setState({roomNo:data.data[2][0].roomId})
            this.setState({portalStatus:data.data[1][0].portalStatus})
            console.log(this.state.portalStatus);
        })
    }
    render(){
        return (
            <div className='d-flex justify-content-center align-items-center'>
                <Card sx={{ maxWidth: "500px", textalign:"center", display:"grid", justifyContent:"space-between"  }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    USN: <h1>{this.state.usn}</h1>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Room No: <h1>{this.state.roomNo}</h1>
                    </Typography>
                </CardContent>
                <CardActions>
                {
                    this.state.roomNo == 0? (
                        this.state.portalStatus === true? 
                        <Link to="/Rooms"><Button variant="contained">Book Room</Button></Link>
                        :
                        <h1>Portal has been closed</h1>
                    )
                    :
                        <h1>Room has been already alloted</h1>
                }
                
                </CardActions>
                </Card>
            </div>
        )
    }
}