const logger = require("../utils/logger");


module.exports = (req, res, next) => {
    const { key } = req.query;
    if (key === process.env.API_KEY) return next()
    logger.error(`key: ${key} is not valid ${req.ip} `)
    return res.status(401).send("key is not valid")
}