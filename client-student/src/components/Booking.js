import React,{useEffect, useState} from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';

const steps = ['Personal Details', 'Review your booking', 'Payment details'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <PaymentForm />;
      
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

const Booking = () => {
    const [roomNo, setRoomNo] = useState('');
    useEffect(()=>{
        const fetchRoom = async () => {
            const res = await axios.get("http://localhost:8001/getRoomNo");
            setRoomNo(res.data.RoomNo);
            window.sessionStorage.setItem('RoomNo',res.data.RoomNo);
            window.sessionStorage.setItem('Price',res.data.Price);
            console.log(window.sessionStorage.getItem('Price'))
            //console.log(res.data);
        }
        fetchRoom();
    },[])
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep(activeStep + 1);
      if(activeStep === steps.length - 1){
        if(window.sessionStorage.length!=0){
          const data = {
            usn: window.sessionStorage.getItem('USN'),
            studentName: window.sessionStorage.getItem('Name'),
            studentEmail: window.sessionStorage.getItem('Email'),
            branch: window.sessionStorage.getItem('Branch'),
            semester: window.sessionStorage.getItem('Semester'),
            studentAddress: window.sessionStorage.getItem('Address'),
            phoneNo: window.sessionStorage.getItem('PhNo'),
            aadhar: window.sessionStorage.getItem('Aadhar'),
            guardianName: window.sessionStorage.getItem('GuardianName'),
            guradianPhNo: window.sessionStorage.getItem('GuardianPhNo'),
            utrNo: window.sessionStorage.getItem('UTR'),
            roomNo: window.sessionStorage.getItem('RoomNo')
          }
          const post = async () => {
            const res = await axios.post('http://localhost:8001/bookHostel',data);
            console.log(res);
            if(res.data.status === 200){
              alert("Room has been booked successfully");
              window.location.href = "./Home";
            }else{
              alert(res.data.error+" and your amount will be refunded within 3 business days");
              const del = await axios.post('http://localhost:8001/deleteBooking',{usn:window.localStorage.getItem('usn')});
            }
          }
          post();
        }
      }
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4, mt:20 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Checkout for Room {roomNo}
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for booking.
                </Typography>
                <Typography variant="subtitle1">
                  The room {roomNo} has been booked.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
  
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Book Now' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </ThemeProvider>
    );
}

export default Booking