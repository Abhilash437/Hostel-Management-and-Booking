const express =require('express');
const mysql=require('mysql2');
const cors = require("cors");
const bcrypt = require('bcrypt');
const bodyParser=require("body-parser");
const cookieparser=require("cookie-parser")
const session=require("express-session");
const saltRounds = 10;

const PORT=process.env.PORT || 8000;

const app=express();


app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    key:"userId",
    secret:"atanu",
    resave:false,
    saveUninitialized:false,
    // cookie:{
    //     expires:60*60*60*24,
    // }
}))

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Abhilash@11',
    database:'HostelManagement'
})





app.get("/",(req,res)=>{
    res.send("hi");
})

app.post("/register",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    bcrypt.hash(password,saltRounds,(errr,hash)=>{
        const data={
       
            email:req.body.email,
            password:hash,        
       
       };
       if(errr)
       {
        console.log(errr);
       }
       else{
        let sqll=`select * from admin where email='${email}'`;
        db.query(sqll,(er,ress)=>{
            console.log(ress);
            if(er){
                console.log(er);
            }else{
            if(ress.length > 0)
            {
                res.send({msg:"User Email Already Present"})

            }
            else{
                let sql="INSERT INTO `admin` SET ?";
                db.query(sql,data,(err,result)=>{
                    if(err)
                    {
                        console.log(err)
                    }
                    else{
                        //  console.log(result);
                         res.send(result);
                        // res.send()
            
                    }
                })
            }
        }
        })

       

       }
      

    })
   
    
     
})

app.post("/login",(req,res)=>{
   const email=req.body.email;
    const password=req.body.password;

    // console.log(email);
        
      
        let sql=`select * from admin where email='${email}'`;
        // console.log(sql);
        db.query(sql,(err,result)=>{
            if(err)
            {
                // res.send({err:err})
                console.log(err);
            }
            else{
              
               if(result.length > 0)
               {
                bcrypt.compare(password,result[0].password,(errr,response)=>{
                    if(response)
                    {
                        req.session.user=result;
                        // console.log(req.session.user);
                     
                     res.send({login:true,useremail:email});
                    }
                    else{
                     res.send({login:false,msg:"Wrong Password"});
                    
                    }
                })

                

               }
               else{
                    res.send({login:false,msg:"User Email Not Exits"});
                // console.log("noo email ")
               }
                
    
            }
        })

      
    
     
})
app.get("/login",(req,res)=>{
    if(req.session.user)
    {
        res.send({login:true,user:req.session.user});
    }
    else{
        res.send({login:false});
    }
})

app.post("/registerStudents",(req,res)=>{
    const usn = req.body.USN;
    const name = req.body.name;
    const email = req.body.email;
    const branch = req.body.branch;
    const sem = req.body.semester;
    const address = req.body.address;
    const phNo = req.body.phno;
    const aadhar = req.body.aadhar;
    const guardianName = req.body.guardianName;
    const guardianPhno = req.body.guardianPhno;

    const data = {
        usn: usn,
        studentName: name,
        studentEmail: email,
        branch: branch,
        semester: sem,
        studentAddress: address,
        phoneNo: phNo,
        aadhar: aadhar,
        guardianName: guardianName,
        guardianPhno: guardianPhno
    }

    console.log(data);

    let sql = `select * from students where usn = '${usn}'`;

    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.length!=0){
                res.send({message:"Student already exists"});
            }else{
                let insert = "INSERT INTO `students` SET ?";
                db.query(insert,data,(err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.send(result);
                    }
                })
            }
        }
    })

    
});

// app.get("/registerStudents",(req,res)=>{
//     console.log(req);
// })

app.post("/addRoom",(req,res)=>{
    const roomNo = parseInt(req.body.roomNo);
    const noOccupants = parseInt(req.body.noOccupants);
    const price = parseInt(req.body.price);
    const bookingStatus = 0;

    const data = {
        noOccupants:noOccupants,
        roomNo:roomNo,
        bookingStatus:bookingStatus,
        price:price
    }

    console.log(data);

    let sql = `select * from rooms where roomNo='${roomNo}'`

    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.length === 0){
                let insert = "INSERT INTO `rooms` SET ?";
                db.query(insert,data,(err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                        res.send(result);
                    }
                })
            }else{
                console.log("Room already exists")
                res.send(`<script>alert("Room already exists");</script>`);
            }
        }
    })
});

app.post("/bookHostel",(req,res)=>{
    const usn = req.body.usn;
    const roomNo = req.body.roomNo;
    const utrNo = req.body.utrNo;
    const bdate = req.body.bDate;

    const data = {
        usn: usn,
        roomId: roomNo,
        utrNo: utrNo,
        bookingDate: bdate
    }

    let rooomHos = `select * from rooms where roomNo = '${roomNo}'`;

    db.query(rooomHos,(err,resRoom)=>{
        if(err){
            console.log(err);
        }else{
            if(resRoom.length != 0){
                let usnStu = `select * from students where usn = '${usn}'`;

    db.query(usnStu,(err,resultUsn)=>{
        if(err){
            console.log(err);
        }else{
            if(resultUsn.length != 0){
                let sql = `select count(*) as noRoommates from hostelBooking where roomId='${roomNo}'`;
                    db.query(sql,(err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            let noOccupants = `select noOccupants from rooms where roomNo = '${roomNo}'`;
                            db.query(noOccupants,(err,noOccres)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    
                                    if(noOccres[0].noOccupants > result[0].noRoommates){
                                        let insert = "INSERT INTO hostelBooking SET ?";
                                        db.query(insert,data,(err,insRes)=>{
                                            if(err){
                                                console.log(err);
                                            }else{
                                                res.send(insRes);
                                                let bookings = `select count(*) as totBookings from hostelBooking where roomId = '${roomNo}'`;
                                                db.query(bookings,(err,resBooking)=>{
                                                    if(err){
                                                        console.log(err);
                                                    }else{
                                                        if(resBooking[0].totBookings === noOccres[0].noOccupants){
                                                            let bookingStatus = `UPDATE rooms SET bookingStatus = 1 where roomNo = '${roomNo}'`;
                                                            db.query(bookingStatus,(err,resBookingStatus)=>{
                                                                if(err){
                                                                    console.log(err);
                                                                }else{
                                                                    console.log(resBookingStatus);
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    }else{
                                        console.log("Already booked!");
                                    }
                                }
                            })
                            }
                        })
                    }
                    else{
                        console.log("Student does not exists in the database!")
                    }
                }
            })
            }else{
                console.log("Room does not exists!");
            }
        }
    })    
});


app.get("/studentDetails",(req,res)=>{
    var ql = req.query.q;
    // console.log(q);
    let q = ql;
    const keys = ['studentName'];
    
    let sql = `select s.usn, s.studentName, s.branch, s.semester, r.roomNo, h.bookingDate from students s, rooms r, hostelBooking h where r.roomNo = h.roomId and s.usn = h.usn`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(result);
            const search = (data) => {
                return data.filter((item)=>{
                    //console.log(ql);
                    // console.log(typeof ql);
                    // console.log(item.studentName.includes(ql))
                    return item.studentName;
                }
                    
                )
            }
            console.log(search(result));
            // console.log(search(result));
            res.send(result);
        }
    })
});

app.get("/roomDetails",(req,res)=>{
    // let sql = `select r.roomNo, r.noOccupants, r.price, r.bookingStatus from rooms r`;
    let sql = `select h.roomId, count(h.usn) as currOccupants, r.noOccupants, r.price, r.bookingStatus from rooms r, hostelBooking h where r.roomNo = h.roomId group by h.roomId`
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
});

app.get("/roomDetails/:roomNo",(req,res)=>{

});




app.listen(PORT,()=>{
    console.log(`app running in ${PORT}` )
})