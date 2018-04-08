const express = require('express');
const hbs = require('hbs');

var app = express();
// dynamic templates
hbs.registerPartials(__dirname + '/views/partials');

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