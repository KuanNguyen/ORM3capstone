const express = require('express');
const trangChuRoute = express.Router();

const { getAnh,getAnhTheoTen } = require('../controllers/trangChuController');

trangChuRoute.get("/getAnh", getAnh)
trangChuRoute.get("/getAnhTheoTen", getAnhTheoTen)



module.exports = trangChuRoute;