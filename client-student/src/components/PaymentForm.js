import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Pay to UPI ID: abcd@testBank and enter the UTR number below
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="utrNo"
            label="UTR Number"
            fullWidth
            autoComplete="utrno"
            variant="standard"
            onChange={(e)=>window.sessionStorage.setItem('UTR',e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}