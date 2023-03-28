const express = require('express');
const nguoidungRoute = express.Router();

const { getUser,getUserId,getPhotoIdUser,getUserIdPhoto,updateUser} = require('../controllers/nguoiDungController');
const { verifyToken } = require('../utils/jwtoken');

nguoidungRoute.get("/getUser",verifyToken, getUser)
nguoidungRoute.get("/getUser/:id",verifyToken, getUserId);
nguoidungRoute.get("/getPhotoIdUser/:id",verifyToken, getPhotoIdUser);
nguoidungRoute.get("/getUserIdPhoto/:id",verifyToken, getUserIdPhoto);
//put
nguoidungRoute.put("/updateUser/:id",verifyToken, updateUser);



module.exports = nguoidungRoute;