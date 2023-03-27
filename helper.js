import { client } from "./index.js";


export async function  getDataByDate(date){
    return await client
       .db("Gold-Calculator")
       .collection("goldData")
       .findOne({date: date});
}

export async function createData(date,goldPrice){
    return await client
       .db("Gold-Calculator")
       .collection("goldData")
       .insertOne({date:date, price:goldPrice})
}


export async function getDateByCurrent(dateISO){
    return await client
       .db("Gold-Calculator")
       .collection("goldData")
       .findOne({date:dateISO})
}