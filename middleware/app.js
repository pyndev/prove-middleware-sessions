const express = require("express");
const app = express();

app.use(middleware1);
app.use(middleware2);

//try middleware
function middleware1(req, res, next) {
    console.log("I'm middleware no.1");  
    req.customProperty = 100;

    // const errObj = new Error("Im an Error");
    // next(errObj);  

    next();
}

function middleware2(req, res, next){
    console.log("I'm middleware no.2");
    console.log("the custom property value is: ",req.customProperty);
    req.customProperty = 500;
    next();
}

function middleware3(req, res, next){
    console.log("I'm middleware no.3");
    next();
}

//method2
// function standardCall(req, res, next) {
//     console.log("I'm standard express function");
//     res.send("Hello word");    
// }

// app.get('/',standardCall);
// app.get('/',middleware1,middleware2,standardCall);


function errorHandler(err, req, res, next) {
    // if (err) {
    //     res.send("There was an error, please try again");
    // }
    res.json({ status:400, err: err});
}

// method1
app.get('/', middleware3, (req, res, next)=>{
    console.log("I'm standard express function");
    res.send("The value is: "+req.customProperty);
})

app.use(errorHandler);

app.listen(5000);