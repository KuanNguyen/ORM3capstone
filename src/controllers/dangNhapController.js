const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { createToken } = require('../utils/jwtoken');
const { successCode, failCode, errorCode } = require('../config/response');


const bcrypt = require('bcrypt');
const login = async (req, res) => {
    try {
        // truy cập database
        // get user ra đúng với email và pass word
        // kiểm tra 2 lần: check email mới check pass

        let { email, pass } = req.body;

        let checkUser = await model.nguoi_dung.findOne({
            where: {
                email: email
                
            }
        })

        // email user có tồn tại
        if (checkUser) {
            
            // kiểm tra tiếp pass word
            // pass: chưa dc mã hóa
            // user pass_word: mã hóa

            //check pass word
            let checkPass = bcrypt.compareSync(pass, checkUser.mat_khau);

            if (checkPass) {

                let token = createToken(checkUser);

                successCode(res, token, "Login thành công");

            } else {
                // pass word sai
                failCode(res, { email, pass }, "Mật khẩu không đúng !");
            }

        } else {
            // email không tồn tại
            failCode(res, { email, pass }, "Email không tồn tại !");
        }
        // quên mật khẩu

    }
    catch (err) {
        res.status(500).send("Lỗi Back end");
        console.log(err)
     
    }
}

module.exports = {
    login
}