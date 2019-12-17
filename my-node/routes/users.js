const express = require('express');
const router = express.Router();
const pool = require("../DB/pool");

router.get("/users", async(req, res, next) => {

    const [query, params] = getUsersQuery(req.query)
    const result = await pool.execute(query, params);
    console.log(result, "-------")
    res.json(result[0])
        // res.json(result.map(row => row.ship_city))
})

function getUsersQuery(params) {
    return [`SELECT * FROM northwind.users;`, [...Object.values(params)]]
}

module.exports = router;