const jwt = require('jsonwebtoken');

// tạo token
const createToken = (data) => {
    let token = jwt.sign({ content: data }, "iphone", { expiresIn: "5m" });
    return token;
}


// kiểm tra token
const checkToken  = (token) => {
    let check = jwt.verify(token, "iphone");
    console.log("check token", check)
    return check;
}

const verifyToken = (req, res, next) => {
    try {
        // kiểm tra token 
        let { tokencybersoft } = req.headers;

        // res.send(tokencybersoft.replace("Bearer ",""));

        let kiemTraToken = checkToken(tokencybersoft);
        if (kiemTraToken) {
            // nếu đúng thì next
            next(); // nhảy qua tham số tiếp theo
        }
    } catch (err) {

        // nếu sai thì res.status(401).send("Không có quyền truy cập");
        res.status(401).send(err.message);
    }


}

module.exports = {
    createToken,
    checkToken,
    verifyToken
}