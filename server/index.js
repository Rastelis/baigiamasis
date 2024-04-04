import express from 'express'
import session from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import user from './controlers/user.js';
import project from './controlers/project.js';

const app = express();

app.set('trust proxy', 1)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.urlencoded({
    extended:true
}));

app.use('/', user)
app.use('/', project)
app.use('/uploads',express.static('./uploads'))

await mongoose.connect('mongodb://localhost:27017/parlament_app');

app.listen(3000);
