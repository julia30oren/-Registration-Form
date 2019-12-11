const express = require("express");
const router = express.Router();
const usersData = require('../datas/users.json');
const JWT = require('jsonwebtoken');


router.post('/login', (req, res, next) => {

    const { users } = usersData;
    const { email, password } = req.body;
    console.log(req.body);
    const userExist = users.find(users => users.email === email && users.password === password);

    if (userExist) {
        const token = JWT.sign({ userExist }, process.env.SECRET, { expiresIn: '1h' });
        console.log("user exist!", token);
        res.json({ message: '__user login completed__', redirect: true, token });
    } else {
        console.log("user don`t exist")
        res.json({ message: `__user ${email} do not exists__`, redirect: false })

    }
})

module.exports = router;