import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');
import { HTTP_CODE_UNAUTHORIZED, HTTP_CODE_FORBIDDEN } from '../lib/constant'

const secret = process.env.JWT_SECRET || 'jsonwebtoken-secret';

interface RequestWithUserRole extends Request {
    user?: any,
}

const isAuth = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {

    const response: { code?: number, message?: string } = {};
    let code = HTTP_CODE_UNAUTHORIZED;
    let access =  req.headers["x-access-token"] || req.headers["authorization"] || req.query.token || req.body.token

    try {
        if ( !access ) {
            code = HTTP_CODE_FORBIDDEN;
            throw new Error('Unauthorized!!!');
        }

        access = access.replace('Bearer ','');
        const user = await jwt.verify( access, secret );
        req.user = user;
        next(); 
    } catch (error) {
        response.code             = code || HTTP_CODE_UNAUTHORIZED
        response.message          = (error as Error).message || 'Unauthorized.'
        return res.status(response.code).json(response);
    }
}

export { isAuth };