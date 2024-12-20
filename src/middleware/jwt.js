const jwt = require("jsonwebtoken")
const jwtAu = (req, res, next) => {
    setTimeout(() => {
        const Whitelist = ["/", "/register", "/login"]
        if (Whitelist.find(item => '/v1/api' + item === req.originalUrl)) {
            next();
        } else {
            if (req?.headers?.authorization?.split(' ')[1]) {
                const token = req.headers.authorization.split(' ')[1]
                //verify
                try {
                    const decode = jwt.verify(token, process.env.JWT_SECRET)
                    console.log(">> check token ", decode)
                    req.user = {
                        email: decode.email,
                        name: decode.name,
                    }
                    next();
                } catch (error) {
                    return res.status(401).json({
                        message: error.message
                    })
                }
            } else {
                return res.status(401).json({
                    message: "bạn chưa truyền token / token hết hạn"
                })
            }
        }
    }, 1000)
};
module.exports = jwtAu