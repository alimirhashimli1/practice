import { Request, Response } from 'express';
import  User  from "../models";

export const registerUser = async(req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne( { where: { email } } );
        if (existingUser) return res.status(400).json( { message: 'User already exists' } );

        const newUser = await User.create( { username, email, password } );
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json( {error: 'Failed to register user'} )
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne( { where: { email } } );
        if(!user || user.password !== password) {
            res.status(401).json({message: 'Invalid credentials'});
        }

        return res.status(200).json({ message: 'Login successful', user});
    } catch (error) {
        return res.status(500).json( {error:'Login failed'})
    }
}