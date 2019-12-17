// const express = require("express");
// const router = express.Router();
// const { flights } = require('../datas/flights.json');
// const JWT = require('jsonwebtoken');

// router.use((req, res, next) => {
//     ///  authorization === token
//     const { authorization } = req.headers;
//     console.log("---- authorization ----", authorization)
//     JWT.verify(authorization, process.env.SECRET, (err, decoded) => {
//         if (err) {
//             console.log("verification failed")
//             return res.status(401).send("verification failed");
//         };
//         console.log(decoded, "---decoded");
//         next();
//     });
// });

// router.get("/AllUsers", (req, res, next) => {
//     console.log(flights);
//     res.json({ flights });
// });




// module.exports = router;