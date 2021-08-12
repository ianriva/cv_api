import dotenv from 'dotenv';
dotenv.config();

export default {
    jwtSecret: process.env.JWT_SECRET,
    DB: {
        URI: process.env.DB_URI || 'mongodb://localhost/tsapi',
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
    }
}