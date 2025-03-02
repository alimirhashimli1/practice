import { Router } from "express";
import { query } from "../db";
const router = Router();
router.get("/", async (req, res) => {
    try {
        const result = await query('SELECT * FROM products');
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;
