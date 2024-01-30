import express  from "express";
import cors from "cors";
const app = express();
import bodyParser from "body-parser";
import dotenv from "dotenv"; 
import todoRoutes from "./routes/todoList.routes";
dotenv.config();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",todoRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})
