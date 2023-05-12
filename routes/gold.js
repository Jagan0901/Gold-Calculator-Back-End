import express from 'express';
import { getDataByDate, createData, getDateByCurrent } from '../helper.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/post", auth ,async(req,res) => {
    const {date,price} = req.body;
    console.log(date,price);
    const isDateExists = await getDataByDate(date);
    if(isDateExists){
        res.status(400).send({error: "Date already exists"})
        return;
    }
    const goldPrice = +price;
    const perGram   = goldPrice/31;
    const create = await createData(date,goldPrice,perGram);

    res.send(create);
});

router.get("/get/today", auth, async(req,res) => {
    const date =  new Date();
    const dateISO = date.toISOString().split('T')[0];

    const today = await getDateByCurrent(dateISO)

    res.send(today);
})


export const goldDataRouter = router;