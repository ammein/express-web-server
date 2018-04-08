const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
// dynamic templates
hbs.registerPartials(__dirname + '/views/partials');

/* 
Using hbs as the
default view engine requires just one line of code in your app setup
*/
// You can use any engine for example : html , pug , hbs and more !
app.set('view engine' , 'hbs');


// Express Middleware
app.use((req , res , next) => {
    /* 
    next params exist because you can tell express when your middleware function is done
    */
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    console.log(log);
    // last arguments for latest node version issues
    // to past your log activating the server
    fs.appendFile('server.log' , log + '\n' , (err) => {
        if(err){
            console.log("Unable to append server.log");
        }
    });
    next();
});

// maintenance site
// app.use((req , res , next) => {
//     res.render('maintenance.hbs');
// });

// takes absolute path on your local static files
// but it can be tricky because project moves around
// Luckily we have __dirname store in your path project directory
// LOAD STATIC FILES
app.use(express.static(__dirname + '/public'));

// Takes first argument of the function to run on rendering like this {{ getCurrentYear }}
// Second argument is the callback/function that you do it for yourself.
hbs.registerHelper('getCurrentYear' , () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
})

// To do http route handler
app.get('/', (req, res) => {
    res.render('home.hbs',{
        author : 'Amin Sharin',
        titlePage : 'Home',
    });
});


// Using app.get we CAN specify MANY ROUTES as we get
app.get('/about' , (req , res) => {
    // specify second argument (object) for second render inject data
    res.render('about.hbs' , {
        author : 'Amin Shazrin',
        pageTitle : 'About Page',
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