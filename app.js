const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const productApi = require('./routes/api/productApi')
const User = require('./models/user');
const seedDB = require('./seed')
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery', true);
mongoose.connect(uri)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let secret = process.env.secret;
const sessionConfig = {
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



passport.use(new LocalStrategy(User.authenticate()));


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//i should send only the required info in my locals, not password etc
// app.use((req, res, next) => {

//     if (req.user) {
//         var { _id, username, email, role } = req.user;
        
//         res.locals.currentUser = { _id, username, email, role };
//     }
//     else res.locals.currentUser = req.user;

//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// });


// Routes require
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart')

app.get('/' , (req,res)=>{
    res.render('home');
})

// middle express
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes)
app.use(productApi)
// seedDB();


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server running at port ${port} version 5`);
});