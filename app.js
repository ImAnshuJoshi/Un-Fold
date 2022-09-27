//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");const path = require("path");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/user");
const { error } = require("./Middlewares/error");
dotenv.config();
const app = express();

// const User=require('./models/userModel');
// (
// User.create({
//     firstName:'Aaa',
//     lastName:'Bbb'
// }).then((err,res)=>{
//     if(!err)
//     console.log("Done");
//     else
//     console.log("Eror");
// })
// )

/* (async ()=>{
    await User.sync({force: false});
    // Table created
    await User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
    const users=await User.findAll();
    console.log(users);

})(); */

/*const token=jwt.sign({
    data: 'foobar'
  },'ABCD', { expiresIn: '1h',algorithm: 'HS256' });

const verified =jwt.verify(token,'ABCD',(err)=>{
    if(!err)
    return true;
    else
    console.log("error aagayi")
});
var decoded;
if(verified)
{
    decoded=jwt.decode(token,{complete:true});
    console.log(decoded);
}  
/*
console.log(decoded);
 */

//Error Handling 
app.use(error);


app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use(express.json());

// // app.use("/secrets", secreteRoute);
app.use("/", userRoutes);
// // app.use(SecretsRouter);
app.listen(3000, function () {
  console.log("Server is Running");
});
