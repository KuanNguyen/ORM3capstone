const multer = require('multer')

const storage = multer.diskStorage({
   // định nghĩa đường dẫn lưu file
   destination: (req, file, cb) => {
      cb(null, process.cwd() + '/public/img')
   },
   // đổi tên file khi upload (trước khi lưu)
   filename: (req, file, cb) => {
      let filename = Date.now() + "_" + file.originalname // tên file gốc chứa định dạng file
      cb(null, filename)
   }
})
const upload = multer({ storage })

module.exports = {upload}


