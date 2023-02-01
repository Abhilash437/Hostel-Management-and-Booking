const express =require('express');
const mysql=require('mysql2');
const cors = require("cors");
const bcrypt = require('bcrypt');
const bodyParser= require("body-parser");
const cookieparser = require("cookie-parser")
const session=require("express-session");
const jwt = require('jsonwebtoken');
const storage = require('node-sessionstorage')



const JWT_SECRET = "jdfghkjbferjh%$^&*#(Bihkdjba112313";


const PORT=process.env.PORT || 8001;

let portalStatus = true;

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
}));

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Abhilash@11',
    database:'HostelManagement'
});

app.post("/register",async (req,res)=>{
    const usn = req.body.usn;
    const password = req.body.password;
    const data = {
        usn: usn,
        pass: await bcrypt.hash(password,10)
    }
    try{
        let sql = `select * from users where usn = '${usn}'`;
        db.query(sql,(err,result)=>{
            if(!err){
                if(result.length === 0){
                    let insert = `INSERT INTO users SET ?`;
                    console.log(data);
                    db.query(insert, data,(err,insertRes)=>{
                        if(!err){
                            console.log("Success");
                            res.send({status:200,data:"User has been registered successfully"})
                        }else{
                            console.log(err);
                            res.send({status:404,error:err, message:"Error"});
                        }
                    })

                }else{
                    console.log("User already exists");
                    res.send({status:404,error:err, message:"User already exists"});
                }
            }else{
                console.log(err);
                res.send({status:404,error:err, message:"Error"});
            }
        })
    }catch(e){
        console.log(e);
    }
});


app.post("/login",async (req,res)=>{
    const usn = req.body.usn;
    const password = req.body.password;
    console.log(req.body);
    let sql = `select * from users where usn = '${usn}'`;
    db.query(sql, async (err, result) => {
        if (!err) {
            if (result.length != 0) {
                //console.log(result[0].password);
                if (await bcrypt.compare(password, result[0].pass)) {
                    const token = jwt.sign({usn:result[0].usn}, JWT_SECRET);
                    if (res.status(201)) {
                        console.log("success");
                        return res.json({ status: "ok", data: token });
                    } else {
                        console.log("failure");
                        return res.json({ error: "error" });
                    }
                } else {
                    res.json({ status: "error", error: "Password incorrect" });
                }
            } else {
                console.log("User does not exists");
                res.json({ status: "error", error: "User does not exists" });
            }
        } else {
            console.log(err);
        }
    })

});

app.post("/home-page",async (req,res)=>{
    const token = req.body;
    //console.log(token.token);
    console.log(token);
    let details = [];
    try{
        const user = jwt.verify(token.token, JWT_SECRET);
        const userUsn = user.usn;
        //console.log(userUsn);
        let findUser = `select u.usn from users u where u.usn = '${userUsn}'`;
        db.query(findUser,(error,result)=>{
            if(!error){
                if(result.length!=0){
                    details.push(result);
                    let findRoom = `select roomId from hostelBooking where usn = '${userUsn}'`;
                    db.query(findRoom,async (err,roomres)=>{
                        if(!err){
                            //console.log(roomres);
                            if(roomres.length != 0){ 
                                 
                                details.push(roomres);
                                console.log(details);
                                res.send({status:"ok",data:details});
                            }else{
                                //console.log("hi");  
                                details.push([{roomId:0}]);
                                console.log(details);
                                res.send({status:"ok",data:details});
                            }
                        }else{
                            console.log(err);
                        }
                    })
                    //console.log(final);
                    details.push([{portalStatus:portalStatus}]);
                    console.log(details);
                    
                }else{
                    console.log("Error");
                }
            }else{
                console.log(error);
            }
        })
    }catch(error){
        res.send({status:"error",data:error});
    }
});

app.get("/roomDetails",async (req,res)=>{
    let sql = `select r.roomNo, r.noOccupants, count(h.roomId) as currentOccupants, r.price from rooms r left outer join hostelBooking h on r.roomNo = h.roomId group by(r.roomNo) having count(h.roomId) < r.noOccupants`;
    db.query(sql,(error,result)=>{
        if(!error){
            //console.log(result);
            res.send(result);
        }else{
            console.log(error);
        }
    })
});

let Rno;

app.post("/bookRoom",async (req,res)=>{
    const roomNo = req.body.roomNo;
    const usn = req.body.usn;
    //console.log(roomNo);
    Rno = roomNo
    storage.setItem('RoomNo', `'${roomNo}'`);
    let sql = `select price from rooms where roomNo = ${roomNo}`;
    db.query(sql,(er,result)=>{
        if(!er){
            //console.log(result)
            storage.setItem('Price',result[0].price);
            const data = {
                roomId: roomNo,
                usn:usn,
                bookingDate:"2023-01-01",
                utrNo:"temp"
            }
            let tempBook = `INSERT INTO hostelBooking SET ?`;
            db.query(tempBook,data,(err,result)=>{
                if(!err){
                    console.log("Temporarily booked");
                    res.send({status:200});
                }else{
                    console.log(err);
                    res.send({status:404,message:err});
                }
            })
        }
    })
    res.cookie('RoomNo',roomNo,{expires: new Date(Date.now() + 900000), httpOnly: true})
});

app.get("/getRoomNo",(req,res)=>{
    //console.log(Rno);
    //console.log(storage.getItem('RoomNo'));
    
    res.send({RoomNo:storage.getItem('RoomNo'),Price:storage.getItem('Price')});
});

app.post('/bookHostel',async (req,res)=>{
    console.log(req.body);
    console.log(Rno);
    let sql = `select usn from users where usn = "${req.body.usn}"`;
    db.query(sql,(err,result)=>{
        if(!err){
            if(result.length!=0){
                const studentData = {
                    usn: req.body.usn,
                    studentName: req.body.studentName,
                    studentEmail: req.body.studentEmail,
                    branch: req.body.branch,
                    semester: req.body.semester,
                    studentAddress: req.body.studentAddress,
                    phoneNo: req.body.phoneNo,
                    aadhar: req.body.aadhar,
                    guardianName: req.body.guardianName,
                    guardianPhNo: req.body.guradianPhNo
                }
                let insertStudent = `UPDATE students SET ? where usn = "${req.body.usn}"`;
                db.query(insertStudent,studentData,(err,insertRes)=>{
                    if(!err){
                        console.log("Successfully inserted data");
                        const date = new Date();
                        const day = date.getDate();
                        const month = date.getMonth()+1;
                        const year = date.getFullYear();

                        const bookingData = {
                            roomId: Rno,
                            usn: req.body.usn,
                            bookingDate: `${year}`+'-'+`${month}`+'-'+`${day}`,
                            utrNo: req.body.utrNo
                        }
                        let insertBooking = `UPDATE hostelBooking SET ? where usn = "${req.body.usn}"`;
                        db.query(insertBooking,bookingData,(err,bookRes)=>{
                            if(!err){
                                console.log("Booked Successfully");
                                res.send({status:200,data:bookRes});
                            }else{
                                console.log(err);
                                res.send({status:404,error:err});
                            }
                        })
                    }else{
                        console.log(err);
                        res.send({status:404,error:err});
                    }
                })
            }
        }else{
            console.log(err);
            res.send({status:404,error:err});
        }
    })
});

app.post("/portalStatus",async (req,res)=>{
    const status = req.body.data;
    portalStatus = status
    if(status === true){
        res.send({status:"ok",data:"Portal has been opened"})
    }else{
        res.send({status:"ok",data:"Portal has been closed"})
    }
});

app.post("/deleteBooking",async (req,res)=>{
    const usn = req.body.usn;
    let sql = `DELETE from hostelBooking where usn = "${usn}"`;
    db.query(sql,(err,result)=>{
        if(!err){
            console.log("The booking has been deleted due to error");
        }else{
            console.log(err);
        }
    })
})



app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})