const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { createToken } = require('../utils/jwtoken');
const { successCode, failCode, errorCode } = require('../config/response');
const fs = require('fs')


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
const Op = require('sequelize').Op 
const getAnhTheoTen = async (req, res) => {
    try {
        const { tenHinh } = req.body
        const data = await model.hinh_anh.findAll({
           where: { ten_hinh: { [Op.like]: '%' + tenHinh + '%' } }
        })
        data.forEach(hinh => {
           const checkDuongDan = fs.existsSync(process.cwd() + hinh.duong_dan)
           if (checkDuongDan) {
              hinh.duong_dan = `${config.DOMAIN}${hinh.duong_dan}`
           }
        })
        successCode(res, data, 'Lấy hình ảnh thành công')
     } catch (err) {
        errorCode(res, 'Lỗi Backend')
        console.log(err)
     }
}


module.exports  = {
    getAnh,
    getAnhTheoTen
}