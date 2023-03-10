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

export default function AddMessDets() {

    const [weekDay, setweekDay] = useState("");
    const [breakfast, setBreakfast] = useState("");
    const [lunch, setlunch] = useState("");
    const [snacks, setsnacks] = useState("");
    const [dinner, setdinner] = useState("");
    const [price, setprice] = useState(0);
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try{
        let res = await axios.post("http://localhost:8000/addMess",{
            weekDay:weekDay,
            breakfast:breakfast,
            lunch:lunch,
            snacks:snacks,
            dinner:dinner,
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80)',
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
              Add Mess Details
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="weekDay"
                label="Day"
                name="weekDay"
                value={weekDay}
                onChange={(e)=>setweekDay(e.target.value)}
                autoComplete="Day"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="breakfast"
                label="Breakfast"
                id="breakfast"
                value={breakfast}
                onChange={(e)=>setBreakfast(e.target.value)}
                autoComplete=""
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lunch"
                label="Lunch"
                id="lunch"
                value={lunch}
                onChange={(e)=>setlunch(e.target.value)}
                autoComplete=""
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="snacks"
                label="Snacks"
                id="snacks"
                value={snacks}
                onChange={(e)=>setsnacks(e.target.value)}
                autoComplete=""
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="dinner"
                label="Dinner"
                id="dinner"
                value={dinner}
                onChange={(e)=>setdinner(e.target.value)}
                autoComplete=""
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price per day"
                id="price"
                value={price}
                onChange={(e)=>setprice(e.target.value)}
                autoComplete=""
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Mess Details
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}