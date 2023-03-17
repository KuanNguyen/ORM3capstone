const express = require('express');
const dangNhapRoute = express.Router();

const { login } = require('../controllers/dangNhapController');

dangNhapRoute.post("/login", login)


module.exports = dangNhapRoute