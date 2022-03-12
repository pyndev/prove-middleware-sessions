const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const session = require('express-session');
const MongoStore = require("connect-mongo");

dotenv.config();
//Middleware that allow express server to past different types
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false, //don't save session if unmodified
    saveUninitialized: true, // don't create session until something stored
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_LOCAL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        collectionName: 'sessions'
      }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //Equals 1 day
    }
}));

app.get('/', (req, res, next)=>{
    console.log(req.session);
    if (req.session.viewCount) {
        req.session.viewCount++;
    }else{
        req.session.viewCount = 1;
    }
    res.send(`You have visited this page ${req.session.viewCount} time.`);
});

app.listen(5000);