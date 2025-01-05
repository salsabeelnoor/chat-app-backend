// const express = require('express');
import express from 'express';
import  authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); //alows to extract the json data outof the request body
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("server is running on port PORT: ", PORT);
    connectDB();
})