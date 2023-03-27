const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { createToken } = require('../utils/jwtoken');
const { successCode, failCode, errorCode } = require('../config/response');

const bcrypt = require('bcrypt');
const signUp = async (req, res) => {


    try {
        const { email, mat_khau, ho_ten, tuoi } = req.body
        const nguoiDung = await model.nguoi_dung.findOne({
           where: { email }
        })
        if (!nguoiDung) {
           const data = await model.nguoi_dung.create({ email, mat_khau, ho_ten, tuoi })
           successCode(res, data, 'Đăng kí thành công')
        } else {
           failCode(res, '', 'Email đã tồn tại')
        }
     } catch (err) {
        errCode(res, 'Lỗi Backend')
     }
}
module.exports = {
    signUp
}