const express = require('express');
const rootRoute = express.Router();
const nguoiDungRoute = require('./nguoidungRoute');
const trangChuRoute = require('./trangChuRoute');
const trangChiTietRoute = require('./trangChiTietRoute')
const dangKiRoute = require('./dangKiRoute')
const dangNhapRoute = require('./dangNhapRoute')


// sử dụng middleware của express
rootRoute.use("/dangki", dangKiRoute)
rootRoute.use("/dangnhap", dangNhapRoute)
rootRoute.use("/nguoidung", nguoiDungRoute)
rootRoute.use("/trangChu", trangChuRoute)
rootRoute.use("/trangChiTiet",trangChiTietRoute)




module.exports = rootRoute;