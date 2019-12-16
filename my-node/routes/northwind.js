const express = require('express');
const router = express.Router();
const db = require('../DB/db_index');
const pool = require("../DB/pool");

router.get("/northwind", async(req, res, netx) => {

    //1
    // db.query('SELECT * FROM northwind.customers;', (err, result) => {
    //     // console.log(err, res);
    //     if (err) {
    //         return res.json(err);
    //         console.log('---err with northwind db', err)
    //     }
    //     return res.json(result)
    // })

    // const { CompanyName, job } = req.query;
    //2 тогда в поиске параметр заварачиваем в '' !
    // db.query(`SELECT * FROM northwind.customers where company = ${CompanyName}`, (err, result) => {
    //     if (err) {
    //         return res.json(err);
    //         console.log('---err with northwind db', err)
    //     }
    //     return res.json(result)
    // })

    //3 тогда в поиске параметр НЕзаварачиваем в '' !
    // const { CompanyName, job } = req.query;
    // db.query(`SELECT * FROM northwind.customers where company = ? and job_title = ?;`, [CompanyName, job], (err, result) => {
    //     if (err) {
    //         return res.json(err);
    //         console.log('---err with northwind db', err)
    //     }
    //     return res.json(result)
    // })

    //4
    const { CompanyName, job } = req.query
    const [query, params] = getCustomersQuery(req.query)
    console.log(query, params)
    db.execute(query, params, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})


router.get("/northwind/cities", (req, res, next) => {
    const { shippingFee } = req.query
    const [query, params] = getCitiesQuery(req.query)
    console.log(query, params)
    db.execute(query, params, (err, result) => {
        if (err) return res.json(err)
            // return res.json(result)
        return res.json(result.map(c => c.ship_city))
    })
})

//5 POOL
router.get("/northwind/citiesAsync", async(req, res, next) => {
    // const { shippingFee } = req.query
    // const [query, params] = getCitiesQuery(req.query)
    // const result = await pool.execute(query, params);
    // console.log(result);
    // res.json(result)
    const [query, params] = getCitiesQuery(req.query)
    const result = await pool.execute(query, params);
    const [first] = result;
    console.log(first)
    res.json(first.map(row => row.ship_city))
})


function getCustomersQuery(params) {
    return [`SELECT * FROM northwind.customers where company = ? and job_title = ?`, [...Object.values(params)]]
}

function getCitiesQuery(params) {
    return [`SELECT DISTINCT(ship_city) FROM northwind.orders where shipping_fee >= ? ;`, [...Object.values(params)]]
}

module.exports = router;