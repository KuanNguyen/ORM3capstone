const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { createToken } = require('../utils/jwtoken');
const { successCode, failCode, errorCode } = require('../config/response');

const bcrypt = require('bcrypt');
const signUp = async (req, res) => {
    try {

        // lấy data từ FE
        let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

        // ES6 => object literal
        let models = {
            email,
            mat_khau: bcrypt.hashSync(mat_khau, 10),
            ho_ten,
            tuoi,
            anh_dai_dien
        }

        // thêm data vào CSDL
        let data = await model.nguoi_dung.create(models);
        if (data)
            res.status(200).send("Thêm user thành công");

    } catch (err) {
        res.status(500).send(err);
        console.log(err)

    }
}
module.exports = {
    signUp
}