const express = require('express');
const trangChiTietRoute = express.Router();

const { getInfoAnhId,getInfoBinhLuan,getInfoAnhLuu } = require('../controllers/TrangChiTietController');

trangChiTietRoute.get("/getInfoAnh", getInfoAnhId)
trangChiTietRoute.get("/getInfoBinhLuan", getInfoBinhLuan)
trangChiTietRoute.get("/getInfoAnhLuu", getInfoAnhLuu)





module.exports = trangChiTietRoute;