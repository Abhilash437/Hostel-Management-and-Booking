import {React, useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function RoomDetails() {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(()=>{
    const fetchRooms = async () => {
      const res = await axios.get("http://localhost:8000/roomDetails");
      setData(res.data);
      console.log(res.data);
    }
    fetchRooms();
  },[]);

  const searchBarStyle = {
    width: '1000px'
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      let res = await axios.get(`http://localhost:8000/roomDetails/${query}`);
      setData([]);
      setData(res.data);
  }


  return (
    <TableContainer className="d-flex justify-content-center flex-column align-items-center pt-5">
        <nav className="navbar navbar-dark bg-dark pb-0 my-0" style={searchBarStyle}>
            <form className="form-inline" onSubmit={handleSubmit}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(e)=>setQuery(e.target.value)}></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </nav>
      <Table sx={{ maxWidth: 1000 }} aria-label="customized table" className='border rounded'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Room Number</StyledTableCell>
            <StyledTableCell align="right">Current occupants</StyledTableCell>
            <StyledTableCell align="right">Number of occupants</StyledTableCell>
            <StyledTableCell align="right">Price&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Booking status&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.roomId}
              </StyledTableCell>
              <StyledTableCell align="right">{row.currOccupants}</StyledTableCell>
              <StyledTableCell align="right">{row.noOccupants}</StyledTableCell>
              <StyledTableCell align="right">{row.price}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.bookingStatus}</StyledTableCell> */}
              {row.currOccupants < row.noOccupants? <StyledTableCell align="right" width="150px" className="badge badge-success text-center">Available</StyledTableCell> : <StyledTableCell align="right" className="badge badge-danger text-center">Booked</StyledTableCell>}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}