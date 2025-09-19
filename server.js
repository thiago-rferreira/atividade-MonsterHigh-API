import express from "express";
import dotenv from "dotenv";

import monstersRoutes from "./src/routes/monstersRoutes.js"

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 5002;

app.get("/", (req, res) => {
    res.send("Servidor funcionando...");
});

app.use("/monsters", monstersRoutes)

app.listen(serverPort, () => {
    console.log("Servidor funcionando.");
});