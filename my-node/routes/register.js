const express = require("express");
const router = express.Router();
const fs = require('fs');
const usersData = require('../datas/users.json');
// const passwordValidation = require('./validSchema');
// router.use(passwordValidation);

router.post('/registration', (req, res, next) => {

    const { users } = usersData;
    const { email, password } = req.body;
    const userExist = users.find(users => users.email === email);
    console.log(userExist)

    if (userExist) {
        console.log('user is allready exist');
        res.json({ message: `__user ${email} already exists__` });
    } else {
        console.log('user saved');
        res.json({ message: '__your registration completed__', redirect: true });
        fs.writeFile("./datas/users.json",
            JSON.stringify({ users: [...users, { "email": email, "password": password }] }),
            (err) => {
                if (err) console.log(err, '--error');
            })
    }
});

module.exports = router;