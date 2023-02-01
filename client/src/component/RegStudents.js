import {React, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Abhilash, Chinmay, Shreyas and Karthik {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function RegStudents() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
    
//   };
const [message, setMessage] = useState("");
const [USN, setUSN] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [branch, setBranch] = useState("");
const [semester, setSemester] = useState("");
const [address, setAddress] = useState("");
const [phno, setPhno] = useState("");
const [aadhar, setAadhar] = useState("");
const [guardianName, setGuardianName] = useState("");
const [guardianPhno, setGuardianPhno] = useState("");

let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post("http://localhost:8000/registerStudents", {
          USN: USN,
          name: name,
          email: email,
          branch: branch,
          semester: semester,
          address: address,
          phno: phno,
          aadhar: aadhar,
          guardianName: guardianName,
          guardianPhno: guardianPhno
      });
      console.log(res);
      // if(res.data.messageg)
      //   {
      //       setMessage(res.data.message);
      //   }
      let resJson = await res.json();
      if (res.data.status === 200) {
        setUSN("");
        setName("");
        setEmail("");
        setBranch("");
        setSemester("");
        setAadhar("");
        setAddress("");
        setPhno("");
        setGuardianName("");
        setGuardianPhno("");
        setMessage("Student created successfully");
        alert(res.data.message);
      } else {
        setMessage("Some error occured");
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          <Typography component="h1" variant="h5">
            Register Student
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="USN"
                  required
                  fullWidth
                  id="USN"
                  label="USN"
                  value={USN}
                  onChange={(e) => setUSN(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Full Name"
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="branch"
                  label="Branch"
                  name="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  autoComplete="CSE"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="semester"
                  label="Semester"
                  name="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  autoComplete="1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="phno"
                  label="Phone Number"
                  name="phno"
                  value={phno}
                  onChange={(e) => setPhno(e.target.value)}
                  autoComplete="+91 1234567899"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="aadhar"
                  label="AADHAR card number"
                  id="aadhar"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value)}
                  autoComplete="8888 8888 8888 8888"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="guardianName"
                  label="Guardian/Parent Name"
                  name="guardianName"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  autoComplete="Parent"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="guardianPh"
                  label="Guardian/Parent Phone number"
                  name="guardianPhno"
                  value={guardianPhno}
                  onChange={(e) => setGuardianPhno(e.target.value)}
                  autoComplete="+91 1234567899"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              name='register'
            >
              Register
            </Button>
          </Box>
        </Box>
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}