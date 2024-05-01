import express from "express"
import dotenv from "dotenv"
import router from "./routes"
import cors from 'cors';
import db from "./config/dbConnect";

dotenv.config()

const app = express()
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router)

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} on port ${process.env.APP_PORT}`);
  })
})




