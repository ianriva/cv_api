import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/authRoutes';
import privateRoutes from './routes/privateRoutes';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

// init
const app = express();

//settings
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.get("/", (req, res)=> {
    res.send(`API on http://localhost/${app.get("port")}`);
});
app.use(authRoutes);
app.use(privateRoutes);

export default app;