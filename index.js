const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const db = require('./config/mongoose');
const sassMiddleware = require('sass-middleware');

const app = express();
const port = 8000;

// Sass middleware (for SCSS to CSS compilation)
app.use(sassMiddleware({
    src: './assets/scss',        // Source of SCSS files
    dest: './assets/css',        // Output destination
    debug: true,                 // Log compile errors
    outputStyle: 'extended',     // Readable CSS
    prefix: '/css'               // URL prefix for CSS
}));

// Parse URL-encoded data and cookies
app.use(express.urlencoded());
app.use(cookieParser());

// Static files and layouts
app.use(express.static('./assets'));
app.use(expressLayouts);

// Extract styles and scripts from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Session middleware with MongoDB store
app.use(session({
    name: 'codeial',                       // Name of the cookie
    secret: 'blahsomething',              // Secret for signing session ID
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100  ,// Session expiry (100 mins)
        secure:false, 
        sameSite: 'lax'          
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_db',
        autoRemove: 'disabled'
    })
}));

// Initialize Passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// Set authenticated user in views
app.use(passport.setAuthenticatedUser);


// Routes
app.use('/', require('./routes'));

// Start server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
