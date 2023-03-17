const express = require('express');
const dangKiRoute = express.Router();

const { signUp } = require('../controllers/dangKicontroller');

dangKiRoute.post("/signUp", signUp)


module.exports = dangKiRoute