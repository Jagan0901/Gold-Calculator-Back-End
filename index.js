import express from 'express';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { goldDataRouter } from './routes/gold.js';


dotenv.config();

const app = express();

//interceptor || converting body to json
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}

export const client = await createConnection();

app.use("/Gold", goldDataRouter);


app.listen(PORT, ()=> console.log("Server started on the PORT", PORT));


