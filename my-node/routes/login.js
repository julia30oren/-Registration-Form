const express = require("express");
const router = express.Router();
const JWT = require('jsonwebtoken');
const pool = require("../DB/pool");

router.post("/login", async(req, res, next) => {
    const [query, params] = ifUserExist(req.body);
    const user = await pool.execute(query, params);
    const { email } = req.body;

    if (user[0][0]) {
        const token = JWT.sign({ email }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ message: 'user exist', user: email, token: token, redirect: true });
        const addToken = await pool.execute(addTokenQuery(), [token, email]);
    } else {
        res.json({ message: 'user do not exist !!!!', redirect: false });
    }
})

function ifUserExist(params) {
    return [`SELECT * FROM northwind.users where email = ? and password = ? ;`, [...Object.values(params)]]
}

function addTokenQuery() {
    return `UPDATE northwind.users SET token = ? WHERE email = ? ;`
}

module.exports = router;