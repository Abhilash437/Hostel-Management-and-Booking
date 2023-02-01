import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Abhilash, Chinmay, Shreyas and Karthik
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default class signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      usn: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e){
    e.preventDefault();
    const {usn, password} = this.state;
    console.log(usn, password);
    const res = await axios.post("http://localhost:8001/register",{usn,password});
    console.log(res);
    if(res.data.status === 200){
      alert("User has been successfully registered");
      window.location.href = "./sign-in"
    }else{
      alert(res.data.message);
    }
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3" sx={{color:"white", fontWeight:"bold"}}>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1, background:"white", p:5, borderRadius:10 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usn"
              label="USN"
              name="usn"
              autoComplete="usn"
              onChange={(e)=>this.setState({usn:e.target.value})}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>this.setState({password:e.target.value})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    )
  }
}