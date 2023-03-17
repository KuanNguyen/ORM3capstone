const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { createToken } = require('../utils/jwtoken');
const { successCode, failCode, errorCode } = require('../config/response');

const getInfoAnhId = async (req, res) => {
    try {
        let { id } = req.body;
        
        let dataOne = await model.hinh_anh.findOne({
            where: {
                hinh_id: id
            }
        }); 

        
         
        if (dataOne){

            let Uid = dataOne.nguoi_dung_id

            let data = await model.nguoi_dung.findOne({
                where: {
                    nguoi_dung_id: Uid
                }
            });
            
            

            successCode(res, {data, dataOne}, "Lấy ảnh thành công");}
        else
            
            failCode(res, id, "ảnh không tồn tại");

    } catch (err) {
        
        errorCode(res, "Lỗi Back end");
        //console.log(err)
    }
}


const getInfoBinhLuan = async (req, res) => {
    try {
        let { id } = req.body;
        
        let dataOne = await model.hinh_anh.findOne({
            where: {
                hinh_id: id
            }
        }); 

        
         
        if (dataOne){

            let Cid = dataOne.hinh_id

            let data = await model.binh_luan.findOne({

                where: {
                    hinh_id:Cid
                }
            });
            
            

            successCode(res, {data, dataOne}, "Lấy ảnh thành công");}
        else
            
            failCode(res, id, "ảnh không tồn tại");

    } catch (err) {
        
        errorCode(res, "Lỗi Back end");
        //console.log(err)
    }
}

const getInfoAnhLuu = async (req, res) => {
    try {
        let { id } = req.body;
        
        let dataOne = await model.luu_anh.findOne({
            where: {
                hinh_id: id
            }
        }); 

        
         
        if (dataOne){

            // let Uid = dataOne.nguoi_dung_id

            // let data = await model.luu_anh.findOne({
            //     where: {
            //         nguoi_dung_id: Uid
            //     }
            // });
            
            

            successCode(res, " ảnh đã được lưu và không thể lưu lại ");}
        else {
            let dataLuu = await model.hinh_anh.findOne({
                where: {
                    hinh_id: id
                }
            }); 

            let { hinh_id, nguoi_dung_id } = dataLuu;

            let ngay_luu = new Date();

            let models = {
                hinh_id,
                nguoi_dung_id,
                ngay_luu
            }


            let data = await model.luu_anh.create(models);
        if (data)
            res.status(200).send("Thêm user thành công");


            //failCode(res,dataLuu, "ảnh không tồn tại");
        }

    } catch (err) {
        
        errorCode(res, "Lỗi Back end");
        console.log(err)
    }
}


module.exports = {
    getInfoAnhId,
    getInfoBinhLuan,
    getInfoAnhLuu
}