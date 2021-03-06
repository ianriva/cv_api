import {Request, Response} from 'express'
import User, {IUser} from '../models/user'
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken(user: IUser): string {
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret as string, {
        expiresIn: 3600
    })
}

export const signUp = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({msg: "Please send email and password"})
    }
    const user = await User.findOne({email: req.body.email})
    if (user) {
        return res.status(400).json({"msg":"User already exists"})
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
};
export const signIn = async (req: Request, res: Response): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({msg: "Please send email and password"})
    }
    const user = await User.findOne({"email": req.body.email});
    if (!user) {
        return res.status(400).json({"msg":"The user doesn't exists"});
    }
    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
        return res.status(200).json({"token": createToken(user)})
    }
    return res.status(400).json({"msg": "Incorrect user data."})
};