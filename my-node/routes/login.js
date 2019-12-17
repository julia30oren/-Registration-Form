const express = require("express");
const router = express.Router();
// const usersData = require('../datas/users.json');
const JWT = require('jsonwebtoken');
const pool = require("../DB/pool");


// router.post('/login', (req, res, next) => {

//     const { users } = usersData;
//     const { email, password } = req.body;
//     console.log(req.body);
//     const userExist = users.find(users => users.email === email && users.password === password);
//     if (userExist) {
//         const token = JWT.sign({ userExist }, process.env.SECRET, { expiresIn: '1h' });
//         console.log("user exist!", token);
//         res.json({ message: '__user login completed__', redirect: true, token });
//     } else {
//         console.log("user don`t exist")
//         res.json({ message: `__user ${email} do not exists__`, redirect: false })
//     }
// })

router.post("/login", async(req, res, next) => {
    const [query, params] = ifUserExist(req.query);
    const user = await pool.execute(query, params);
    console.log(user[0][0], '--user');
    const { email, password } = req.query;

    if (user[0][0]) {
        const token = JWT.sign({ email }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ message: 'user exist', user: email, password: password, token: token });
        const addToken = await pool.execute(addTokenQuery(), [token, email]);
    } else {
        res.json({ message: 'user do not exist !!!!' });
    }
})

function ifUserExist(params) {
    return [`SELECT * FROM northwind.users where email = ? and password = ? ;`, [...Object.values(params)]]
}

function addTokenQuery() {
    return `UPDATE northwind.users SET token = ? WHERE email = ? ;`
}

module.exports = router;