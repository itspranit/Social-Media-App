const express=require('express');
const cookieParser=require('cookie-parser')
const app=express();
const port=8000;//default is 80
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(sesson);//requires a argument session because we need to store session info 
const sassMiddleware=require('sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss ',//from where do i get the scss files
    dest:'. /assets/css',
    debug:true,//display errors in terminal if encoutered during compilation?
    outputStyle:'extended',//do i want evry thing insingle lines or multiple lines?multiple lines
    prefix:'/css'//where should my server look for css files
}));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store session cookie in the db
app.use(session({
    name:'codial', //name of session cookie
    secret:'blahsomething',//used to encrypt data
    //do i want to store data  of user that has not logged in?
    saveUninitialized:false,
    //do i want to ssave unchanged data repeatedly?
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        
            mongooseConnection:db,
            autoRemove:'disabled'
        
    },
    function(err){
        console.log(err||'connect-mongodb setup ok')
    }
)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port:${port}`);
});
