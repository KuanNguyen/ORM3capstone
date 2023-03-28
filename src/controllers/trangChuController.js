const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { createToken } = require('../utils/jwtoken');
const { successCode, failCode, errorCode } = require('../config/response');


//get ảnh 
const getAnh = async (req, res) => {
    try {
        let data = await model.hinh_anh.findAll(); // => list object => [{}]
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send("Lỗi Back end");
    }
}

//get ảnh theo tên 
const getAnhTheoTen = async (req, res) => {
    try {
        let { ten } = req.body;
        let dataOne = await model.hinh_anh.findOne({
            where: {
                ten_hinh: ten
            }
        }); 
        if (dataOne)
            successCode(res, dataOne, "Lấy ảnh thành công");
        else
            failCode(res, id, "ảnh không tồn tại");
    } catch (err) {        
        errorCode(res, "Lỗi Back end");
    }
}


module.exports  = {
    getAnh,
    getAnhTheoTen
}