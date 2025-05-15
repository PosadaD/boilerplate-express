let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: false }));


app.use("/public", express.static(__dirname + "/public"));

absolutePath = __dirname + "/views/index.html";

app.use((req, res, next) =>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

app.get( '/',  (req, res) => {
    res.sendFile(absolutePath)
})


app.get("/json", (req, res) =>{

    message  = "Hello json"

    if (process.env.MESSAGE_STYLE === "uppercase"){
        message = message.toUpperCase();
    } 

    res.json({"message": `${message}`})   
})

app.get("/now", (req, res, next)=>{
    req.time = new Date().toString();
    next();
}, (req, res)=>{
    res.json({"time": `${req.time}`})
})



app.get("/:word/echo", (req, res) =>{
    res.json({"echo": `${req.params.word}`})
})


app.route("/name")
    .get((req, res) => {
        res.json({
            name: `${req.query.first} ${req.query.last}`
        });
    })
    .post((req, res) => {
      const data = req.body;
      res.json({
        name: `${data.first} ${data.last}`
      });
    });

 module.exports = app;
