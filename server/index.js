const express =require('express');
const mysql=require('mysql2');
const cors = require("cors");
const bcrypt = require('bcrypt');
const bodyParser= require("body-parser");
const cookieparser = require("cookie-parser")
const session=require("express-session");
const multer = require('multer');
const path = require('path');
const { defaultMaxListeners } = require('events');
const cloudinary = require('cloudinary').v2;
const saltRounds = 10;


const PORT=process.env.PORT || 8000;

const app=express();


app.use(cors({
    origin:["http://localhost:3000","http://localhost:3001"],
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
    password:'',
    database:'HostelManagement'
});

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images');     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: storage
});

cloudinary.config({
    cloud_name: "daqlipjde",
    api_key: "866243194927737",
    api_secret: "JscJmOvHG9Pwh0wK8bzC4dr5zIk"
});







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
                res.send({status:404,message:"Student already exists"});
            }else{
                let insert = "INSERT INTO `students` SET ?";
                db.query(insert,data,(err,result)=>{
                    if(err){
                        console.log(err);
                        res.send({status:404,message:err});
                    }else{
                        res.send({status:200,data:result,message:"Student has been registered successfully"});
                    }
                })
            }
        }
    })

    
});

// app.get("/registerStudents",(req,res)=>{
//     console.log(req);
// })

app.post("/addRoom",upload.single('image'),(req,res)=>{
    const roomNo = parseInt(req.body.roomNo);
    const noOccupants = parseInt(req.body.noOccupants);
    const price = parseInt(req.body.price);
    const img = req.body.image;
    const bookingStatus = 0;
    // const temp = cloudinary.uploader.upload(img, {public_id: `${roomNo}`});

    // temp.then((data) => {
    //     console.log(data);
    //     console.log(data.secure_url);
    //   }).catch((err) => {
    //     console.log(err);
    //   });


    const data = {
        noOccupants:noOccupants,
        roomNo:roomNo,
        bookingStatus:bookingStatus,
        price:price
    }


    console.log(req)
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
                        res.send({status:404,data:result,message:err});
                    }else{
                        res.send({status:200,data:result,message:"Room has been added"});
                    }
                })
            }else{
                console.log("Room already exists")
                res.send({status:404,message:"Room already exists"});
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
    
    let sql = `select s.usn, s.studentName, s.branch, s.semester, r.roomNo, h.bookingDate from students s left outer join hostelBooking h on s.usn = h.usn left outer join rooms r on r.roomNo = h.roomId`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.get("/studentDetails/:name",(req,res)=>{
    let Name = req.params.name;
    //console.log(studentName);
    let sql = `select s.usn, s.studentName, s.branch, s.semester, r.roomNo, h.bookingDate from students s left outer join hostelBooking h on s.usn = h.usn left outer join rooms r on r.roomNo = h.roomId`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            result = result.filter((el) => `'${el.studentName}'` === Name)
            console.log(result);
            res.send(result);
        }
    })
})

app.get("/roomDetails",(req,res)=>{
    // let sql = `select r.roomNo, r.noOccupants, r.price, r.bookingStatus from rooms r`;
    let sql = `select r.roomNo, count(h.usn) as currOccupants, r.noOccupants, r.price from rooms r left outer join hostelBooking h on r.roomNo = h.roomId  group by r.roomNo`;
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
    let roomId = req.params.roomNo;
    console.log(roomId);
    //console.log(studentName);
    let sql = `select r.roomNo, count(h.usn) as currOccupants, r.noOccupants, r.price from rooms r left outer join hostelBooking h on h.roomId = r.roomNo group by r.roomNo`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            result = result.filter((el) => el.roomNo == roomId);
            console.log(result);
            res.send(result);
        }
    })
});

app.post('/updateRoom',(req,res)=>{
    const roomNo = parseInt(req.body.roomNo);
    const updateValue = parseInt(req.body.updatevalue);
    const updateField = req.body.updatefield;

    let sql = `select roomNo from rooms where roomNo = ${roomNo}`;
    db.query(sql,(err,result)=>{
        if(!err){
            if(result.length != 0){
                let update = `update rooms set ${updateField} = ${updateValue} where roomNo = ${roomNo}`;
                db.query(update,(err, updateRes) => {
                    if(!err){
                        console.log("Success");
                    }else{
                        console.log(err);
                    }
                })
            }else{
                console.log("Room does not exists");
            }
        }else{
            console.log(err);
        }
    })
})


app.post('/deleteRoom',(req,res)=>{
    const roomNo = parseInt(req.body.roomNo);

    let sql = `select roomNo from rooms where roomNo = ${roomNo}`;
    db.query(sql,(err,result)=>{
        if(!err){
            if(result.length != 0){
                let Delete = `delete from rooms where roomNo = ${roomNo}`;
                db.query(Delete,(err, updateRes) => {
                    if(!err){
                        console.log("Success");
                    }else{
                        console.log(err);
                    }
                })
            }else{
                console.log("Room does not exists");
            }
        }else{
            console.log(err);
        }
    })
    
});

app.post('/updateStudent',(req,res)=>{
    const usn = req.body.usn;
    const updateField = req.body.updatefield;
    const updateValue = req.body.updatevalue;

    let sql = `select * from students where usn = "${usn}"`;
    db.query(sql,(err,result)=>{
        if(!err){
            if(result.length!=0){
                let update = `update students set ${updateField} = "${updateValue}" where usn = "${usn}"`;
                db.query(update,(err,updateRes)=>{
                    if(!err){
                        console.log("Success")
                    }else{
                        console.log(err);
                    }
                });
            }else{
                console.log("Student does not exists");
            }
        }else{
            console.log(err);
        }
    })
});

app.post('/deleteStudent',(req,res)=>{
    const usn = req.body.usn;
    const flag = req.body.flag;
    console.log(flag)
    if(flag == '0'){
        let sql = `select usn from students where usn = "${usn}"`;
        db.query(sql,(err,result)=>{
            if(!err){
                if(result.length != 0){
                    let Delete = `delete from students where usn = "${usn}"`;
                    db.query(Delete,(err, updateRes) => {
                        if(!err){
                            console.log("Success");
                        }else{
                            console.log(err);
                        }
                    })
                }else{
                    console.log("Student does not exists");
                }
            }else{
                console.log(err);
            }
        });
    }else{
        let sql = `delete from users`;
        db.query(sql,(err,result)=>{
            if(!err){
                console.log("Deleted all students successfully");
            }else{
                console.log(err);
            }
        })
    }
    
});


app.post("/addStaff",(req,res)=>{
    const staffId = req.body.staffId;
    const staffName = req.body.staffName;
    const staffType = req.body.staffType;
    const staffPhNo = req.body.staffPhNo;
    const staffAddress = req.body.staffAddress;
    const staffSalaryPerMonth = req.body.staffSalaryPerMonth;


    const data = {
        staffId:staffId,
        staffName:staffName,
        staffType:staffType,
        staffPhNo:staffPhNo,
        staffAddress:staffAddress,
        staffSalaryPerMonth:staffSalaryPerMonth
    }

    console.log(data);

    let sql = `select * from staffs where staffId = '${staffId}'`;

    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.length!=0){
                res.send({message:"Staff already exists"});
            }else{
                let insert = "INSERT INTO `staffs` SET ?";
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

app.get("/staffDetails",(req,res)=>{
    
    let sql = `select staffId, staffName, staffType, staffPhNo, staffAddress, staffSalaryPerMonth from staffs`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.get("/staffDetails/:name",(req,res)=>{
    let Name = req.params.name;
    let sql = `select staffId, staffName, staffType, staffPhNo, staffAddress, staffSalaryPerMonth from staffs where staffName = ${Name}`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
});


app.post('/updateStaff',(req,res)=>{
    const staffId = req.body.staffId;
    const updateField = req.body.updatefield;
    const updateValue = req.body.updatevalue;

    let sql = `select * from staffs where staffId = "${staffId}"`;
    db.query(sql,(err,result)=>{
        if(!err){
            if(result.length!=0){
                let update = `update staffs set ${updateField} = "${updateValue}" where staffId = "${staffId}"`;
                db.query(update,(err,updateRes)=>{
                    if(!err){
                        console.log("Success")
                    }else{
                        console.log(err);
                    }
                });
            }else{
                console.log("Staff does not exists");
            }
        }else{
            console.log(err);
        }
    })
});

app.post('/deleteStaff',(req,res)=>{
    const staffId = req.body.staffId;

    let sql = `select * from staffs where staffId = "${staffId}"`;
    db.query(sql,(err,result)=>{
        if(!err){
            if(result.length != 0){
                let Delete = `delete from staffs where staffId = "${staffId}"`;
                db.query(Delete,(err, updateRes) => {
                    if(!err){
                        console.log("Success");
                    }else{
                        console.log(err);
                    }
                })
            }else{
                console.log("Staff does not exists");
            }
        }else{
            console.log(err);
        }
    })
    
});

app.post("/addMess",(req,res)=>{
    const weekDay = req.body.weekDay;
    const breakfast = req.body.breakfast;
    const lunch = req.body.lunch;
    const snacks = req.body.snacks;
    const dinner = req.body.dinner;
    const price = req.body.price;


    const data = {
        weekDay:weekDay,
        breakfast:breakfast,
        lunch:lunch,
        snacks:snacks,
        dinner:dinner,
        price:price
    }

    console.log(data);

    let sql = `select * from mess where weekDay = '${weekDay}'`;

    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            if(result.length!=0){
                res.send({message:"Day already exists"});
            }else{
                let insert = "INSERT INTO `mess` SET ?";
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

app.get("/messDetails",(req,res)=>{
    
    let sql = `select weekDay, breakfast, lunch, snacks, dinner, price from mess`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.get("/MessDetails/:name",(req,res)=>{
    let Name = req.params.name;
    let sql = `select weekDay, breakfast, lunch, snacks, dinner, price from mess where weekDay = ${Name}`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(result);
        }
    })
});


app.post('/updateMess',(req,res)=>{
    const weekDay = req.body.weekDay;
    const updateField = req.body.updatefield;
    const updateValue = req.body.updatevalue;

    let sql = `select * from mess where weekDay = "${weekDay}"`;
    db.query(sql,(err,result)=>{
        if(!err){
            if(result.length!=0){
                let update = `update mess set ${updateField} = "${updateValue}" where weekDay = "${weekDay}"`;
                db.query(update,(err,updateRes)=>{
                    if(!err){
                        console.log("Success")
                    }else{
                        console.log(err);
                    }
                });
            }else{
                console.log("Day does not exists");
            }
        }else{
            console.log(err);
        }
    })
});

app.post('/deleteMess',(req,res)=>{
    const weekDay = req.body.weekDay;

    let sql = `select * from mess where weekDay = "${weekDay}"`;
    db.query(sql,(err,result)=>{
        if(!err){
            if(result.length != 0){
                let Delete = `delete from mess where weekDay = "${weekDay}"`;
                db.query(Delete,(err, updateRes) => {
                    if(!err){
                        console.log("Success");
                    }else{
                        console.log(err);
                    }
                })
            }else{
                console.log("Day does not exists");
            }
        }else{
            console.log(err);
        }
    })
    
});


app.get("/profileDetails",async (req,res)=>{
    let sql = `select count(s.usn) as NumberOfStudentsInHostel from students s, hostelBooking h where s.usn = h.usn`;
    let details = [];
    db.query(sql,(err,result)=>{
        if(!err){
            if(result.length!=0){
                details.push(result);
                console.log(details);
                let roomDetails = `select count(*) as NumberOfRooms from rooms`;
                db.query(roomDetails,(err,result)=>{
                    if(!err){
                        if(result.length!=0){
                            details.push(result);
                            console.log(details);
                            let bookedRooms = `select count(distinct roomId) as NumberOfRoomsBooked from hostelBooking`;
                            db.query(bookedRooms,(err,result)=>{
                                if(!err){
                                    details.push(result);
                                    console.log(details);
                                    let messFee = `select sum(price) as MessFee from mess`;
                                    db.query(messFee,(err,result)=>{
                                        if(!err){
                                            result[0].MessFee= result[0].MessFee * 43.4524 //messFee * number of weeks in 10 months
                                            details.push(result);
                                            console.log(details);
                                            res.send({status:"ok",data:details});

                                        }else{
                                            console.log(err);
                                        }
                                    })
                                    
                                }else{  
                                    console.log(err);
                                }
                            })
                        }
                    }else{
                        console.log("Error");
                    }
                })
            }
        }else{
            console.log(err);
            res.send({error:err, message:"Error"});
        }
    })

})



app.listen(PORT,()=>{
    console.log(`app running in ${PORT}` )
})