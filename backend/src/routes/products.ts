import { Router } from "express";
import {query} from "../db/index.js";
import { Product } from "../types/index.js";

const router = Router();

router.get("/", async (req, res) => {
    try {       
         console.log("Fetching products...");
        const result = await query('SELECT * FROM products');
        console.log("Query result:", result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error("Database query error:", error);
        res.status(500).json({error: (error as Error).message})
    }
});

export default router;