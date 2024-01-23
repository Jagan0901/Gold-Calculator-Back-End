import { client } from "./index.js";
import bcrypt from 'bcrypt';

export async function  getDataByDate(date){
    return await client
       .db("Gold-Calculator")
       .collection("goldData")
       .findOne({date: date});
}

export async function createData(date,goldPrice,perGram){
    return await client
       .db("Gold-Calculator")
       .collection("goldData")
       .insertOne({date:date, price:goldPrice, pricePerGram: perGram})
}


export async function getDateByCurrent(dateISO){
    return await client
       .db("Gold-Calculator")
       .collection("goldData")
       .findOne({date:dateISO})
}

export async function getData(req){
    return await client
    .db("Gold-Calculator")
    .collection("goldData")
    .find(req.query)
    .toArray();
}

export async function unWantedData(date) {
  return await client
    .db("Gold-Calculator")
    .collection("goldData")
    .deleteMany({date: {$lt:date}});
}

export async function getUserByMail(email) {
  return await client
    .db("Gold-Calculator")
    .collection("users")
    .findOne({email:email})
}

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
//   console.log(salt);
  const hashedPassword = await bcrypt.hash(password,salt);
//   console.log(hashedPassword);
  return hashedPassword;
}

export async function createUser(email, hashedPassword) {
  return await client
    .db("Gold-Calculator")
    .collection("users")
    .insertOne({ email: email, password: hashedPassword });
}