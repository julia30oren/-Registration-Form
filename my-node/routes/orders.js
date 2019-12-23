const express = require('express');
const router = express.Router();
const pool = require("../DB/pool");
const JWT = require('jsonwebtoken');

// проверка верификации со стороны разработчика. Но лучше делать проверку со стороны клиента!
// router.use((req, res, next) => {
//     const { authorization } = req.headers;
//     console.log(authorization)

//     JWT.verify(authorization, process.env.SECRET, (err, decoded) => {
//         if (err) return res.status(401).send('verification failed');
//         else console.log(decoded);
//         next();
//     })
// })

router.get("/orders", async(req, res, next) => {
    const result = await pool.execute(getOrdersQuery());
    res.json(result[0])
})

router.post("/orders/sortBy", async(req, res, next) => {
    const { ship_city, payment_type } = req.body;
    // console.log(ship_city, payment_type);
    const result = await pool.execute(getOrdersSortedQuery(), [(ship_city || ''), (payment_type || '')]);
    // console.log(result);
    res.json(result[0])
})

function getOrdersQuery() {
    return `SELECT * FROM northwind.orders;`
}

function getOrdersSortedQuery() {
    return `SELECT * FROM northwind.orders WHERE ship_city = ? OR payment_type = ? ;`
}

module.exports = router;