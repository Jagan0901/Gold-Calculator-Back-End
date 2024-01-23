import express from 'express';
import { getDataByDate, createData, getDateByCurrent, getData, unWantedData } from '../helper.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/post", auth ,async(req,res) => {
    const {date,price} = req.body;
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
});

router.get("/get",auth, async(req,res)=>{
  const currentDate = new Date();  
  let lastWeekDate = new Date(currentDate);
  lastWeekDate.setDate(currentDate.getDate() - 9);
  const formattedLastWeekDate = lastWeekDate.toISOString().split("T")[0];

  const data = await getData(req);
  const dataDeduction = await unWantedData(formattedLastWeekDate);
  res.send(data);
})


export const goldDataRouter = router;