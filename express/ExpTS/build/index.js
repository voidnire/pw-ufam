import express from "express";
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
dotenv.config();
validateEnv();
const app = express();
const PORT = process.env.PORT || 3333;
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
