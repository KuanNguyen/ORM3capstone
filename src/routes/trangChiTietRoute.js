const express = require('express');
const trangChiTietRoute = express.Router();
const { upload } = require("../utils/upload")
const { successCode} = require("../config/response")

const { getInfoAnhId,getInfoBinhLuan,getInfoAnhLuu,themAnh, xoaAnh } = require('../controllers/TrangChiTietController');
const { verifyToken } = require('../utils/jwtoken');

trangChiTietRoute.get("/getInfoAnh/:hinh_id" ,verifyToken, getInfoAnhId)
trangChiTietRoute.get("/getInfoBinhLuan/:id",verifyToken, getInfoBinhLuan)
trangChiTietRoute.get("/getInfoAnhLuu/:hinh_id",verifyToken, getInfoAnhLuu)

trangChiTietRoute.post("/themAnh", upload.single("img"), themAnh);

trangChiTietRoute.post(
  "/upload",
  verifyToken,
  upload.single("img"),
  (req, res) => {
    console.log(req.file);
    successCode(res, req.file, "Thêm ảnh thành công");
  }
);

trangChiTietRoute.delete("/xoaAnh/:hinh_id", xoaAnh)


module.exports = trangChiTietRoute;