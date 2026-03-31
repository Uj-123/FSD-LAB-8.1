const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Product Database
const products = {
    "laptop": { name: "High-End Workstation", price: 2500, region: "Conflict Zone" },
    "shirt": { name: "Cotton T-Shirt", price: 30, region: "Stable Zone" }
};

// API Route
app.get('/api/analyze/:item', async(req, res) => {
    const item = req.params.item;
    const product = products[item];

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    const newsHeadline = item === "laptop" ?
        "War escalates in chip manufacturing hub..." :
        "Local textile markets see record harvest...";

    try {
        const sentimentScore = item === "laptop" ? -0.5 : 0.6;

        const isUrgent = sentimentScore < -0.3 && product.region === "Conflict Zone";

        res.json({
            ...product,
            newsHeadline,
            sentimentScore,
            isUrgent,
            recommendation: isUrgent ?
                "BUY NOW: Prices likely to spike" :
                "PRICE STABLE: Buy at leisure"
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}); // ✅ THIS WAS MISSING

// Server Start
app.listen(5000, () => {
    console.log("Logic Server running on http://localhost:5000");
});