import React,{useState,useEffect} from 'react'
import { useHistory} from 'react-router-dom'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    Button
} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      paddingBottom:0
  }
}))

const Profile = () => {
const [email, setEmail] = useState("")
const [login, setLogin] = useState(false)
const [details, setDetails] = useState([]);

useEffect(()=>{
  const getDetails = async () => {
    const res = await axios.get("http://localhost:8000/profileDetails");
    console.log(res.data.data);
    if(res.status === 200)
      setDetails(res.data.data);
    else
      alert("Error");
  }
  getDetails();
},[])

const his=useHistory();
  axios.defaults.withCredentials = true;

  useEffect(() => {
     const checkLogin= async ()=>{
      let val= await axios.get("http://localhost:8000/login");
      setLogin(val.data.login)
      if(val.data.user)
      {
          //  console.log(val.data);
         
          setEmail(val.data.user[0].email)
      }
      else{
        his.push("/login")
      }
     }
     checkLogin();
  },[login]);

  const classes = useStyles();
//   const data = [
//     { quarter: 1, earnings: 13000 },
//     { quarter: 2, earnings: 16500 },
//     { quarter: 3, earnings: 14250 },
//     { quarter: 4, earnings: 19000 }
// ]

  const [isopen, setIsOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    const chageStatusPortal = async () => {
      const res = await axios.post("http://localhost:8001/portalStatus",{data:isopen});
      alert(res.data.data);
    }
    chageStatusPortal();
  }

  return (
    <>
    <section style={{
      backgroundColor:'royalblue',
      width:'100%',
      height:'90vh',
    }}>
       <div className="box" >
      
      <h1>WELCOME TO HOSTEL MANAGEMENT</h1>
      <p>
        {
          login ? email :null
        }
      </p>
    
     </div>
      <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {details.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={details.indexOf(elem)}>
                        <Card>
                            <CardHeader
                                title={
                                  `${Object.keys(elem[0])}`
                                }
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                {Object.values(elem[0])}{Object.keys(elem[0]) === "MessFee"? "Rs":null}
                                </Typography>
                            </CardContent>
                        </Card>
                     </Grid>
                ))}
            </Grid>
            <div style={{display: "table", width: "100%",paddingTop:"30px",paddingBottom:"0"}}>
            <form onSubmit={handleSubmit} style={{display: "tableCell", textAlign: "center", verticalAlign: "middle"}}>
            {
              isopen ? 
              <Button type="submit" style={{backgroundColor:'red',border:'1px solid white'}} onClick={(e) => setIsOpen(false)}>Close the portal</Button>
              :
              <Button  type="submit" style={{backgroundColor:'green',border:'1px solid white'}} onClick={(e) => setIsOpen(true)}>Open the portal</Button>
            }
            </form>
            </div>
        </div>
    
      
      
      </section>      
    </>
  )
}

export default Profile;
