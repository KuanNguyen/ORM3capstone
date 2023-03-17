const express = require('express');
const nguoidungRoute = express.Router();

const { getUser} = require('../controllers/nguoiDungController');

nguoidungRoute.get("/getUser", getUser)



module.exports = nguoidungRoute;