const express = require('express');
const router = express.Router();
const pool = require("../DB/pool");

router.get("/orders", async(req, res, next) => {

    const [query, params] = getOrdersQuery(req.query)
    const result = await pool.execute(query, params);
    // console.log(result[0][0], "-------")
    res.json(result[0])
        // res.json(result.map(row => row.ship_city))
})

function getOrdersQuery(params) {
    return [`SELECT * FROM northwind.orders;`, [...Object.values(params)]]
}

module.exports = router;