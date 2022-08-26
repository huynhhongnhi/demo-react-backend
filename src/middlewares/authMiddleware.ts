import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
import { HTTP_CODE_UNAUTHORIZED, HTTP_CODE_FORBIDDEN } from '../lib/constant'

const secret = 'jsonwebtoken-secret';

interface RequestWithUserRole extends Request {
    user?: any,
}

const isAuth = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {

    const response: { code?: number, message?: string } = {};
    let code = HTTP_CODE_UNAUTHORIZED;
    let token =  req.headers["x-access-token"] || req.headers["authorization"] || req.query.token || req.body.token
    
    try {
        if ( !token ) {
            code = HTTP_CODE_FORBIDDEN;
            throw new Error('Unauthorized!!!');
        }

        const access: any = req.headers.authorization;
        console.log('---------------')
        console.log(access, secret)
        console.log('---------------')
        const user = await jwt.verify( access, secret );
        req.user = user;

        next(); 
    } catch (error) {
        console.log(error)
        response.code             = code || 500
        response.message          = (error as Error).message || 'Unauthorized.'
        return res.status(response.code).json(response);
    }
}

export { isAuth };