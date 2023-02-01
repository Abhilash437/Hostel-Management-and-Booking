import React,{useState, useEffect} from 'react'
import RoomCard from './RoomCard'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid,CardHeader} from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(4)
  }
}))

const Rooms = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [roomNo, setRoomNo] = useState(0);
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchStudents = async () => {
      const res = await axios.get(`http://localhost:8001/roomDetails`);
      setData(res.data);
      //console.log(res.data);
    }
    fetchStudents();
  },[]);

  const handleSubmit = async (e) => {
   e.preventDefault();
    console.log(roomNo);
    //console.log(query);
    // setData([]);
    navigate('/Booking');
    const usn = window.localStorage.getItem('usn');
    const res = await axios.post(`http://localhost:8001/bookRoom`,{roomNo:roomNo, usn:usn});

    // setData(res.data);
    // console.log(res.data);
  }
  return (
    <div className={classes.root} style={{paddingTop:"100px"}}>
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
              {data.map((row,i) => (
                  <Grid  item xs={12} sm={6} md={3} >
                    <form onSubmit={handleSubmit}>
                    <Card >
                      <CardMedia
                          component="img"
                          alt=""
                          height="200"
                          image={require('./images/hostel'+(((i%5)+1)%5)+'.jpg')}
                      />
                          <CardHeader
                              title={row.roomNo}
                          />
                              <CardContent>
                                  <Typography variant="h5" gutterBottom>
                                      Number of occupants: {row.noOccupants}
                                  </Typography>
                                  <Typography variant="h5" gutterBottom>
                                      Seats left: {row.noOccupants - row.currentOccupants}
                                  </Typography>
                                  <Typography variant="h5" gutterBottom>
                                      Price: {row.price} Rs
                                  </Typography>
                              </CardContent>
                          <CardActions>
                              <Button size="small" type="Submit" value={row.roomNo} onClick={(e)=>{return setRoomNo(e.target.value)}} name="boookRoom">
                                Book Now
                              </Button>
                          </CardActions>
                  </Card>
                  </form>
                  
              </Grid>
                ))
              }
            
            
            </Grid>
    </div>
        
  )
}

export default Rooms