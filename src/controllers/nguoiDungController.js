const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { createToken } = require('../utils/jwtoken');
const { successCode, failCode, errorCode } = require('../config/response');


const getUser = async (req, res) => {
    try {
        // SELECT * FROM user;
        // bất đồng bộ
        let data = await model.nguoi_dung.findAll(); // => list object => [{}]

        res.status(200).send(data);

    } catch (err) {
        res.status(500).send("Lỗi Back end");
    }
}









module.exports = {
    getUser
}