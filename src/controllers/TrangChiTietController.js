const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize);
const { successCode, failCode, errorCode } = require('../config/response');

//get thông tin ảnh và người tạo ảnh bằng Id ảnh 
const getInfoAnhId = async (req, res) => {
    try {
        let { hinh_id } = req.params;
        
        let dataOne = await model.hinh_anh.findOne({
            where: {
                hinh_id: hinh_id
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
    }
}

//get thông tin bình luận theo id ảnh 
const getInfoBinhLuan = async (req, res) => {
    try {
      let { id } = req.params;
      let checkImage = await model.hinh_anh.findOne({
        where: {
          hinh_id: id
      }
      });
      if (checkImage) {
        let data = await model.binh_luan.findAll({
          where: {
            hinh_id: id
        }
        });
        successCode(res, data, "Lấy dữ liệu thành công");
      } else {
        failCode(res, "Không tìm thấy id ảnh");
      }
    } catch (err) {
      console.log(err)
      errorCode(res, "Lỗi Backend");
    }
}

//get thông tin đã lưu ảnh này chưa 
const getInfoAnhLuu = async (req, res) => {
    try {
        let { hinh_id } = req.params;
        let checkImage = await model.hinh_anh.findOne({
          where: { hinh_id },
        });
        if (checkImage) {
          let checkSaveImage = await model.luu_anh.findOne({
            where: {
              hinh_id,
            },
          });
          if (checkSaveImage) {
            successCode(res, checkSaveImage, "Ảnh đã được lưu");
          } else {
            successCode(res, "Ảnh chưa được lưu");
          }
        } else {
          failCode(res, "Không tìm thấy id ảnh");
        }
      } catch (err) {
        errorCode(res, "Lỗi Backend");
        console.log(err)
      }
}


//post thêm 1 ảnh 
const themAnh = async (req,res) => {
    const fs = require("fs");

  if (req.file.size >= 400000) {
    fs.unlinkSync(process.cwd() + "/public/img" + req.file.filename);
    res.send("Chỉ được phép upload 4mb");
    return;
  }
  //console.log(req.file.mimetype);
  if (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg") {
    fs.unlinkSync(process.cwd() + "/public/img" + req.file.filename);
    res.send("Sai định dạng");
  }

  fs.readFile(process.cwd() + "/public/img" + req.file.filename,(err, data) => {
      let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
      setTimeout(() => {fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);}, 5000);
      res.send(dataBase);
    }
  );
}

//xóa ảnh 
const xoaAnh = async (req, res) => {
    try {
      let { hinh_id } = req.params;
      let checkImage = await model.hinh_anh.findOne({
        where: {
          hinh_id,
        },
      });
      if (checkImage) {
        let checkImgComment = await model.binh_luan.findOne({
          where: { hinh_id },
        });
        if (checkImgComment) {
          let delImgComment = await model.binh_luan.destroy({
            where: {
              hinh_id,
            },
          });
        }
        let checkSaveImg = await model.luu_anh.findOne({
          where: {
            hinh_id,
          },
        });
        if (checkSaveImg) {
          let delSaveImg = await model.luu_anh.destroy({
            where: {
              hinh_id,
            },
          });
        }
        let delImage = await model.hinh_anh.destroy({
          where: { hinh_id },
        });
        successCode(res, delImage, "Đã xóa ảnh");
      } else {
        failCode(res, "Ảnh không tồn tại");
      }
    } catch (err) {
      errorCode(res, "Lỗi Backend");
      console.log(err)
    }
  };
  

module.exports = {
    getInfoAnhId,
    getInfoBinhLuan,
    getInfoAnhLuu,
    themAnh,
    xoaAnh
}