// const express = require('express');
import express from 'express';
import  authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import cors from "cors";
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import { app, server } from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(express.json()); //alows to extract the json data outof the request body
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
    console.log("server is running on port PORT: ", PORT);
    connectDB();
})