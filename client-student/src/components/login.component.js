import React, { Component } from 'react';
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

export default class login extends Component {
  constructor(props){
    super(props);
    this.state = {
      usn: "",
      password:""
    }
    this.handlesubmit = this.handlesubmit.bind(this);
  }
  async handlesubmit(e){
    e.preventDefault();
    const {usn,password} = this.state;
    console.log(usn, password);
    const res = await axios.post("http://localhost:8001/login",{usn,password});
    //if(res.status === 201)
    const obj = {...res};
    if(obj.data.status === "ok"){
      alert (
        "Login Successful"
      );
      window.localStorage.setItem("token",obj.data.data);
      window.localStorage.setItem("usn",usn);
      window.location.href = "./Home"
      console.log(obj.data.data);
    }else{
      alert(res.data.error);
      console.log(res.data.error);
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
            Log in
          </Typography>
          <Box component="form" onSubmit={this.handlesubmit} noValidate sx={{ mt: 1, background:"white", p:5, borderRadius:10 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usn"
              label="USN"
              name="usn"
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
              onChange={(e)=>this.setState({password:e.target.value})}
              autoComplete="current-password"
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
              log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
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