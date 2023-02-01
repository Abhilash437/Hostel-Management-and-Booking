import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

export default function AddressForm() {
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
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
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
                  onChange={(e) => {sessionStorage.setItem("USN", e.target.value);return setUSN(e.target.value)}}
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
                  onChange={(e) => {sessionStorage.setItem("Name", e.target.value);return setName(e.target.value)}}
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
                  onChange={(e) => {sessionStorage.setItem("Email", e.target.value);return setEmail(e.target.value)}}
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
                  onChange={(e) => {sessionStorage.setItem("Branch", e.target.value);return setBranch(e.target.value)}}
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
                  onChange={(e) => {sessionStorage.setItem("Semester", e.target.value);return setSemester(e.target.value)}}
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
                  onChange={(e) => {sessionStorage.setItem("Address", e.target.value);return setAddress(e.target.value)}}
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
                  onChange={(e) => {sessionStorage.setItem("PhNo", e.target.value);return setPhno(e.target.value)}}
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
                  onChange={(e) => {sessionStorage.setItem("Aadhar", e.target.value);return setAadhar(e.target.value)}}
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
                  onChange={(e) => {sessionStorage.setItem("GuardianName", e.target.value);return setGuardianName(e.target.value)}}
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
                  onChange={(e) => {sessionStorage.setItem("GuardianPhNo", e.target.value);return setGuardianPhno(e.target.value)}}
                  autoComplete="+91 1234567899"
                />
              </Grid>
            </Grid>
    </React.Fragment>
  );
}