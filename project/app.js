const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const login= require("./controller/loginController")
const showPage = require('./controller/dashboardController')
const auth = require('./sevecies/auth')
const cookieParser = require("cookie-parser");
const logout = require("./controller/logout")
const userFunction = require('./model/user')

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, "data.json");
// console.log(login.attemp())

// app.use(auth.cookieParser); // ✅ must be before routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.use(cookieParser())
//create
app.get("/register",showPage.create)
app.post('/register',userFunction.create)
//login
app.get('/login',login.page,)
app.post('/student',login.attemp );

//forget
app.get('/forget-password',showPage.forget)
// GET all students
app.get("/student",auth.checkGuest,auth.isAuthentication,showPage.dashboard)
app.get('/student/profile',auth.checkGuest,auth.isAuthentication,showPage.profile)

// Edit form
app.get("/student/edit",auth.checkGuest,auth.isAuthentication,showPage.edit)
app.post("/student/profile",auth.isAuthentication,userFunction.update)

//logout
app.get("/signin",logout.signout)


app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





