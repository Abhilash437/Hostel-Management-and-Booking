import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { RadioGroup } from '@mui/material';
import {FormLabel} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Radio} from '@mui/material';
import {FormControl} from '@mui/material';
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

export default function UpdateStaffs() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        let res = await axios.post("http://localhost:8000/updateStaff",{
            staffId:staffId,
            updatevalue: updatevalue,
            updatefield: updatefield
        });
        console.log(res);
    }catch(err){
        console.log(err);
    }
  };

  const [staffId, setstaffId] = useState("");
  const [updatevalue, setUpdateValue] = useState("");
  const [updatefield, setUpdateField] = useState("staffId");

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
            backgroundImage: 'url(https://source.unsplash.com/random)',
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
              Update Staff Details
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="staffId"
                label="Staff ID"
                value = {staffId}
                onChange={(e) => setstaffId(e.target.value)}
                autoFocus
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={updatefield}
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="staffId" onChange={(e)=>{setUpdateField(e.target.value); console.log(e.target.value)}} control={<Radio />} label="Staff ID" />
                  <FormControlLabel value="staffName" onChange={(e)=>{setUpdateField(e.target.value); console.log(e.target.value)}} control={<Radio />} label="Staff Name" />
                  <FormControlLabel value="staffType" onChange={(e)=>{setUpdateField(e.target.value); console.log(e.target.value)}} control={<Radio />} label="Staff Type" />
                  <FormControlLabel value="staffPhNo" onChange={(e)=>{setUpdateField(e.target.value); console.log(e.target.value)}} control={<Radio />} label="Staff Phone Number" />
                  <FormControlLabel value="staffAddress" onChange={(e)=>{setUpdateField(e.target.value); console.log(e.target.value)}} control={<Radio />} label="Staff Address" />
                  <FormControlLabel value="staffSalaryPerMonth" onChange={(e)=>{setUpdateField(e.target.value); console.log(e.target.value)}} control={<Radio />} label="Staff Salary Per Month" />
                </RadioGroup>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="newVal"
                label="New Value"
                value = {updatevalue}
                onChange={(e) => setUpdateValue(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}