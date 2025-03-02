import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import productsRouter from "./routes/products.js";
import { error } from 'console';
import { query } from "./db/index.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter)

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK'});
})


query("SELECT 1")
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection failed:", err));


app.listen(5000, () => console.log("Server running on port 5000"));
