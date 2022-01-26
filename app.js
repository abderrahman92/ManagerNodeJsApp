var mysql =require('mysql');
var body =require('body-parser')
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 5000;
//connection data base
require('dotenv').config();
 let connection = mysql.createConnection({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASS,
       database: process.env.DB_NAME
     });

    connection.connect((err)=>{
    if(err){
        console.log("erreur de connection");
    }
    else{
        console.log("Connection a la base usermanagement_tut à été etablie avec succes")
    }
})
// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true})); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

const routes = require('./server/routes/user');
app.use('/', routes);



app.listen(port, () => console.log(`Listening on port ${port}`));