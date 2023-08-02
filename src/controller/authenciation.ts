import { authenciation } from './../helpers/index';

import express from "express";
import { createUser,getUserByEmail } from "db/users";
import { random } from "helpers";
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authenciation.salt +authenciaton.password');
        if (!user) {
            return res.sendStatus(400);
        }
        const expectedHash = authenciation(user.authenciation.salt, password);
        if (user.authenciation.password !== expectedHash) {
            return res.sendStatus(400);
        }

        const salt = random();
        user.authenciation.sessionToken = authenciation(salt, user._id.toString());
        await user.save();

        res.cookie('SAMBISA-REST_API', user.authenciation.sessionToken, { domain: 'localhost', path: '/' })
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, fullname, phone } = req.body;
        if (!email || !password || !fullname || !phone) {
            return res.sendStatus(400)
        }
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400)
        }

        const salt = random();
        const user = await createUser({
            email, fullname, phone,
            authenciation: {
                salt,
                password:authenciation(salt,password)
            }
        })

        return res.status(200).json(user).end()

    } catch (error) {
        return res.sendStatus(400);
        console.log(error)
    }
}