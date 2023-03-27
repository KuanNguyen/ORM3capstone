const express = require('express');
const nguoidungRoute = express.Router();

const { getUser} = require('../controllers/nguoiDungController');
const { verifyToken } = require('../utils/jwtoken');

nguoidungRoute.get("/getUser",verifyToken, getUser)



module.exports = nguoidungRoute;