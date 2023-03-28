const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { createToken } = require('../utils/jwtoken');
const { successCode, failCode, errorCode } = require('../config/response');


//trang đăng nhập
const login = async (req, res) => {
    try {
        const { email, mat_khau } = req.body
        const nguoiDung = await model.nguoi_dung.findOne({
           where: { email }
        })
        if (nguoiDung) {
           if (nguoiDung.mat_khau === mat_khau) {
              nguoiDung.mat_khau = ''
              const token = createToken(nguoiDung)
              successCode(res, { nguoiDung, token }, 'Đăng nhập thành công')
           } else {
              failCode(res, '', 'Mật khẩu không đúng')
           }
        } else {
           failCode(res, '', 'Email không đúng')
        }
  
     } catch (err) {
      console.log(err)
        errorCode(res, 'Lỗi Backend')
     }
}

module.exports = {
    login
}