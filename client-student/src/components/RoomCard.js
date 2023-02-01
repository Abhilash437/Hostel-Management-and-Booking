import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid,CardHeader} from '@material-ui/core';
import { Path } from 'react-router-dom';


export default function RoomCard(roomNo, noOccupants, currentOccupants) {
  return (
    <Grid item xs={12} sm={6} md={3}>
        <Card>
            <img
                src="./images/hostel3.jpg"
            ></img>
                <CardHeader
                    title={roomNo}
                />
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Number of occupants: {noOccupants}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Seats left: {noOccupants - currentOccupants}
                        </Typography>
                    </CardContent>
                <CardActions>
                    <Button size="small">Book Now</Button>
                </CardActions>
        </Card>
    </Grid>
  );
}