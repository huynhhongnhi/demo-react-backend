const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'jsonwebtoken-secret';

const hashTokenAccess = async (user: any) => {
    return await jwt.sign(user, secret, {
        "algorithm": "HS256",
        expiresIn: 86400
    })
}

export default {
    hashTokenAccess
}