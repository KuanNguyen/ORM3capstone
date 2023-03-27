const express = require('express');
const nguoidungRoute = express.Router();

const { getUser, getUserId, updateUser, getPhotoIdUser, getUserIdPhoto } = require('../controllers/nguoiDungController');
//get
nguoidungRoute.get("/getUser", getUser);
nguoidungRoute.get("/getUser/:id", getUserId);
nguoidungRoute.get("/getPhotoIdUser/:id", getPhotoIdUser);
nguoidungRoute.get("/getUserIdPhoto/:id", getUserIdPhoto);
//put
nguoidungRoute.put("/updateUser/:id", updateUser);

module.exports = nguoidungRoute;