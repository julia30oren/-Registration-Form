const express = require("express")
const Joi = require('@hapi/joi');

const validSchema = Joi.object({
    // email: Joi.string().regex(/^(?=.*[@])[a-zA-Z\@]+$/i, 'Your email must containe only letters and ( @ )').min(10).max(20),
    // password: Joi.string().min(3).max(3),
    departure: Joi.string().min(2).max(10),
    arrival: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD').min(10).max(10),
})

function passwordValidation(req, res, next) {
    const { error } = validSchema.validate(req.query);
    if (error) return res.json({ error });
    next();
}

module.exports = passwordValidation;