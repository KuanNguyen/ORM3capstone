const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { createToken } = require('../utils/jwtoken');
const { successCode, failCode, errorCode } = require('../config/response');

//get tất cả user 
const getUser = async (req, res) => {
    try {
     
        let data = await model.nguoi_dung.findAll(); 
        res.status(200).send(data);

    } catch (err) {
        res.status(500).send("Lỗi Back end");
    }
}

//get id
const getUserId = async(req, res) => {
    try {
        let { id } = req.params;
        // SELECT * FROM user WHERE user_id=req.param.id;

        let dataOne = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id: id
            }
        }); // => object => {}

        if (dataOne)
            successCode(res, dataOne, "Lấy dữ liệu thành công");
        else
            failCode(res, dataOne, "User không tồn tại !");

    } catch (err) {
        errorCode(res, dataOne, "Lỗi Back end");
    }
};

//update user
const updateUser = async(req, res) => {

    try {
        let { id } = req.params; // => 13
        // SELECT * FROM user WHERE user_id=req.param.id;

        let dataOne = await model.nguoi_dung.findOne({
            where: {
                nguoi_dung_id: id
            }
        }); // => object => {}

        if (dataOne) {
            //update user
            let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

            // ES6 => object literal
            let models = {
                email,
                mat_khau,
                ho_ten,
                tuoi,
                anh_dai_dien
            }
            let data = await model.nguoi_dung.update(models, {
                where: {
                    nguoi_dung_id: id
                }
            });
            console.log(data); // => [1]
            if (data[0] == 1)
                successCode(res, dataOne, "Cập nhật dữ liệu thành công");
            else
                successCode(res, dataOne, "Không có dữ liệu mới để cập nhật");
        } else
            failCode(res, dataOne, "User không tồn tại !");

    } catch (err) {
        errorCode(res, dataOne, "Lỗi Back end");
    }

};

//get luu anh
const getPhotoIdUser = async(req, res) => {
    try {
        let { id } = req.params;
        // SELECT * FROM user WHERE user_id=req.param.id;

        let data = await model.luu_anh.findAll({
            include: ["nguoi_dung"],
            where: {
                nguoi_dung_id: id,
            }

        }); // => object => {}

        if (data)
            res.status(200).send(data);
        else
            res.status(400).send("User không tồn tại !");

    } catch (err) {
        console.log(err)
        res.status(500).send("Lỗi Back end");
    }
}; 

//get tao anh
const getUserIdPhoto = async(req, res) => {
    try {
        let { id } = req.params;
        // SELECT * FROM user WHERE user_id=req.param.id;

        let dataOne = await model.hinh_anh.findAll({
            include: ["nguoi_dung"],
            where: {
                nguoi_dung_id: id,
            }

        }); // => object => {}

        if (dataOne)
            res.status(200).send(dataOne);
        else
            res.status(400).send("ảnh không tồn tại !");

    } catch (err) {
        res.status(500).send("Lỗi Back end");
    }
}

module.exports = {
    getUser,
    getUserId,
    getUserIdPhoto,
    getPhotoIdUser,
    updateUser
}