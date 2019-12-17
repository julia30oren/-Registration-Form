const express = require('express');
const router = express.Router();
const pool = require("../DB/pool");
// const passwordValidation = require('./validSchema');
// router.use(passwordValidation);

// router.post('/registration', (req, res, next) => {
//     const { users } = usersData;
//     const { email, password } = req.body;
//     const userExist = users.find(users => users.email === email);
//     console.log(userExist)
//     if (userExist) {
//         console.log('user is allready exist');
//         res.json({ message: `__user ${email} already exists__` });
//     } else {
//         console.log('user saved');
//         res.json({ message: '__your registration completed__', redirect: true });
//         fs.writeFile("./datas/users.json",
//             JSON.stringify({ users: [...users, { "email": email, "password": password }] }),
//             (err) => {
//                 if (err) console.log(err, '--error');
//             })
//     }
// });

router.post("/registration", async(req, res, next) => {
    const [query, params] = ifUserExist(req.body);
    const user = await pool.execute(query, params);
    console.log(user[0][0], '--user');
    const { email, password } = req.body;

    if (user[0][0]) {
        return res.json({ message: 'user allready exist' });
    } else {
        const result = await pool.execute(addUserInsert(), [email, password]);
        console.log(result);
        res.json({ message: 'user is added !!!!', redirect: true });
    }
})

function ifUserExist(params) {
    return [`SELECT * FROM northwind.users where email = ? ;`, [...Object.values(params)]]
}

function addUserInsert() {
    return `INSERT INTO northwind.users (id_users, email, password, first_name, last_name)
            VALUES (${Math.random()*100}, ?, ?, 'sam', 'winchester');`
}

module.exports = router;