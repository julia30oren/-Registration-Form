const express = require("express");
const router = express.Router();
const JWT = require('jsonwebtoken');
const pool = require("../DB/pool");
const bcrypt = require('bcryptjs');

////encoding password:
// const password = "123";
// const salt = bcrypt.genSaltSync(10)
// var hash = bcrypt.hashSync(password, salt);
// console.log(hash)
// const cryptoPass = bcrypt.hashSync(password, salt);
// console.log(" === ", cryptoPass);
// console.log(hash)
// const cryptoPassChek = bcrypt.compareSync(password, hash)
// console.log(hash)
// console.log(" ++ ", cryptoPassChek);

////token :
// const email = 'julia@gmail.com';
// const token = JWT.sign({ email }, process.env.SECRET, { expiresIn: '1h' });
// console.log("token --", token);
// var decoded = JWT.verify(token, process.env.SECRET);
// console.log(decoded.email, decoded.exp);

router.post("/login", async(req, res, next) => {
    const { email, password } = req.body;

    const result = await pool.execute(ifUserExist(), [email]);
    const hush = result[0][0].password;
    // console.log(hush)
    const cryptoPassChek = bcrypt.compareSync(password, hush);
    // console.log(cryptoPassChek)

    if (cryptoPassChek === true) {
        const token = JWT.sign({ email }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ message: 'user loged in', user: email, token: token, cookie_token: process.env.SECRET, redirect: true });
    } else {
        res.json({ message: 'user do not exist !!!!', redirect: false });
    }
})

router.post("/login/PasswordChenge", async(req, res, next) => {
    const { email, password, newpass } = req.body;

    const result = await pool.execute(ifUserExist(), [email]);
    const hush = result[0][0].password;
    const cryptoPassChek = bcrypt.compareSync(password, hush);
    console.log(cryptoPassChek)

    if (cryptoPassChek === true) {
        const salt = bcrypt.genSaltSync(10);
        const newhash = bcrypt.hashSync(newpass, salt);
        const cangePassword = await pool.execute(cangePasswordQuery(), [newhash, email]);
        res.json({ message: 'password chenged', user: email, redirect: true })
    } else {
        res.json({ message: 'password NOT chenged', redirect: false });
    }
})


function ifUserExist() {
    return `SELECT password FROM northwind.users where email = ? ;`
}

function cangePasswordQuery() {
    return `UPDATE northwind.users SET password = ? WHERE email = ? ;`
}

module.exports = router;