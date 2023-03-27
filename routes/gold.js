import express from 'express';
import { getDataByDate, createData, getDateByCurrent } from '../helper.js';


const router = express.Router();

router.post("/post", async(req,res) => {
    const {date,price} = req.body;
    console.log(date,price);
    const isDateExists = await getDataByDate(date);
    if(isDateExists){
        res.status(400).send({error: "Date already exists"})
        return;
    }
    const goldPrice = +price;
    const create = await createData(date,goldPrice);

    res.send({message: "Created Successfully"});
});

router.get("/get/today", async(req,res) => {
    const date =  new Date();
    const dateISO = date.toISOString().split('T')[0];

    const today = await getDateByCurrent(dateISO)

    res.send(today);
})


export const goldDataRouter = router;