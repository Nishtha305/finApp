const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];

    if(token == null) return res.sendStatus(401);
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, process.env.TOKEN_SECRET);
        res.locals.jwtPayload = jwtPayload;
        req.body.user = jwtPayload;
    } catch (error) {
        res.status(401).json({message: error.message});
        return;
    }
    next()
}

module.exports = auth;