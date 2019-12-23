const express = require("express")
const Joi = require('@hapi/joi');

const validSchema = Joi.object({
    email: Joi.string().regex(/^(?=.*[@])[a-zA-Z\1-9\@.]+$/i, 'Your email must containe only letters and  @ .').min(10).max(30),
    password: Joi.string().regex(/^[1-9]+$/i).min(4).max(4),
    F_name: Joi.string().regex(/^[a-zA-Z]+$/i).min(2),
    L_name: Joi.string().regex(/^[a-zA-Z]+$/i).min(2),

    name: Joi.any(),
    ship_city: Joi.any(),
    payment_type: Joi.any()
})

function passwordValidation(req, res, next) {
    const { error } = validSchema.validate(req.body);
    if (error) {
        console.log(error)
        return res.json({ message: 'Wrong format of email or password.Your email must containe only letters and @. Password 4 leters' });
    }
    next();
}

module.exports = passwordValidation;