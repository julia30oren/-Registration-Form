const express = require('express');
const router = express.Router();
const pool = require("../DB/pool");

router.get("/users", async(req, res, next) => {
    // const [query, params] = getUsersQuery(req.query)
    const result = await pool.execute(getUsersQuery());
    console.log(result, "-------")
    res.json(result[0])
})

router.post("/users/byName", async(req, res, next) => {
    const { name } = req.body;
    console.log('name-', name)
    const result = await pool.execute(getUsersByNameQuery(), [name, name]);
    console.log(result[0], "-------")
    res.json(result[0])
})

function getUsersQuery() {
    return `SELECT * FROM northwind.users;`
}

function getUsersByNameQuery() {
    return `SELECT * FROM northwind.users WHERE first_name = ? OR last_name = ?;`
}

module.exports = router;