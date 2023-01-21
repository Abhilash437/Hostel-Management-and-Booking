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

export default function StaffDetails() {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(()=>{
    const fetchStudents = async () => {
      const res = await axios.get(`http://localhost:8000/staffDetails`);
      setData(res.data);
      console.log(res.data[0]);
    }
    fetchStudents();
  },[]);

  const searchBarStyle = {
    width: '1000px'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(query);
    setData([]);
    const res = await axios.get(`http://localhost:8000/staffDetails/'${query}'`);
    setData(res.data);
    console.log(res.data);
  }

  return (
    <TableContainer className="d-flex justify-content-center flex-column align-items-center pt-5">
      <nav className="navbar navbar-dark bg-dark pb-0 my-0" style={searchBarStyle}>
        <form onSubmit={handleSubmit}>
        <div className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)}></input>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </div>
        </form>
      </nav>
      <Table sx={{ maxWidth: 1000 }} aria-label="customized table" className='border rounded'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Staff ID</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Staff Type&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Phone Number&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Address&nbsp;</StyledTableCell>
            <StyledTableCell align="right">Salary per month&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.staffId}
              </StyledTableCell>
              <StyledTableCell align="right">{row.staffName}</StyledTableCell>
              <StyledTableCell align="right">{row.staffType}</StyledTableCell>
              <StyledTableCell align="right">{row.staffPhNo}</StyledTableCell>
              <StyledTableCell align="right">{row.staffAddress}</StyledTableCell>
              <StyledTableCell align="right">₹{row.staffSalaryPerMonth}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}