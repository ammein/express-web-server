const express = require('express');
const hbs = require('hbs');

var app = express();

/* 
Using hbs as the
default view engine requires just one line of code in your app setup
*/
app.set('view engine' , 'hbs');

// takes absolute path on your local static files
// but it can be tricky because project moves around
// Luckily we have __dirname store in your path project directory
// LOAD STATIC FILES
app.use(express.static(__dirname + '/public'));

// To do http route handler
app.get('/', (req, res) => {
    // res.send({
    //     name : 'Andrew',
    //     likes : [
    //         'biking',
    //         'Cities'
    //     ]
    // })
    res.render('home.hbs',{
        welcome : 'Amin Sharin',
        currentYear : new Date().getFullYear(),
        titlePage : 'Home'
    });
});


// Using app.get we CAN specify MANY ROUTES as we get
app.get('/about' , (req , res) => {
    // specify second argument (object) for second render inject data
    res.render('about.hbs' , {
        pageTitle : 'About Page',
        currentYear : new Date().getFullYear()
    });
});


// bad request - send back JSON with errorMessage property
app.get('/bad' , (req , res) => {
    res.send({
        errorMessage : 'Unable to handle request'
    });
});
app.listen(3000 , () => {
    console.log("Server is up on port 3000");
});