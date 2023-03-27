import express from 'express';
import jwt  from 'jsonwebtoken';
import { getDateByCurrent } from '../helper.js';

const router = express.Router();


router.post("/", async(req,res) => {
    const date =  new Date();
    const dateISO = date.toISOString().split('T')[0];

    const today = await getDateByCurrent(dateISO)
    const token = jwt.sign({id: today._id}, process.env.SECRET_KEY)
    res.send(token);
})


export const jwtRouter = router;