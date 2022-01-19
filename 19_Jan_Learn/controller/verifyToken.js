const jwt = require('jsonwebtoken');

const authRole = async (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.TokenSecret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invaild Token'+error);
    }
}

module.exports = {authRole}