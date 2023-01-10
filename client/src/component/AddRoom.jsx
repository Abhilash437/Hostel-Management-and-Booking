import {React, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Abhilash, Chinmay, Shreyas and Karthik{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function AddRoom() {

    const [roomNo, setroomNo] = useState(0);
    const [noOccupants, setnoOccupants] = useState(0);
    const [price, setprice] = useState(0);
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try{
        let res = await axios.post("http://localhost:8000/addRoom",{
            roomNo:roomNo,
            noOccupants:noOccupants,
            price:price
        });
        console.log(res);
    }catch(err){
        console.log(err)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Room
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="roomNo"
                label="Room Number"
                name="roomNo"
                value={roomNo}
                onChange={(e)=>setroomNo(e.target.value)}
                autoComplete="Room Number"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="noOccupants"
                label="Number of occupants"
                id="noOccupants"
                value={noOccupants}
                onChange={(e)=>setnoOccupants(e.target.value)}
                autoComplete=""
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price per annum"
                id="price"
                value={price}
                onChange={(e)=>setprice(e.target.value)}
                autoComplete=""
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="image"
                type="file"
                autoComplete=""
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Room
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}