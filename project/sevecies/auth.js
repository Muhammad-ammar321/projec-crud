const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const jwt = require('jsonwebtoken')

const secret = "🤫 no data"
module.exports = {
    sessions: {

    },


    checkGuest(req, res, next) {
        const token = req.cookies.token
        if (!token) return res.redirect('/login')
        
        next()

    },

    isAuthentication(req, res, next) {
        const token = req.cookies.token;
        if (!token)  {
            return res.status(401).render('login',{ err :"login first"}) 
        }
        try {
            const verified = jwt.verify(token, secret)
            req.user = verified
            next()
        } catch (err) {
            return res.status(403).render('login', { err: "Invalid or expired token" });
        }
    },
    attempLogin(req, res, next) {

    },
    generateToken(req, res, next) {
        const token = jwt.sign({id:student.id},secret,{expiresIn:60})
        
        return  res.cookie("token",token,{httpOnly:true})
        
    },

    savedLogin(req, res, next) {

    },
    cookieParser(headers) {
        if (!headers.cookie) return {};

        const cookieObj = {}
        const cookiesArr = headers.cookie.split(';')

        for (let i = 0; i < cookiesArr.length; i++) {
            const cookie = cookiesArr[i].trim();
            const cookieArr = cookie.split('=')
            cookieObj[cookieArr[0]] = cookieArr[1]
        }
        return cookieObj


    }

}
        // if(loggedIN) return res.redirect('/')
        // if (!sessionId || !sessions[sessionId]) {
        //     sessions.error = {error : "Please login first"}
        //     return res.status(401).redirect('/login');

        // }