import { Request, Response } from "express";
import { resError, resSuccess } from '../commons/responseJson';
import { userService } from '../services/UserService'
import authHelper from '../helpers/authHelper'
import { HTTP_CODE_ERROR, HTTP_CODE_SUSSCESS, HTTP_CODE_UNAUTHORIZED } from '../lib/constant';

interface RequestWithUserRole extends Request {
    user?: any,
} 

const loginAuth = async (req: Request, res: Response) => {

    let code = HTTP_CODE_ERROR;

    try {
        const { email, password } = req.body;

        const user = await userService.getFindUser({ email })
        if ( !user ) {
            code = HTTP_CODE_UNAUTHORIZED;
            throw new Error("Email or password incorrect!");
        }

        const isMatch = await user.comparePassword(password)
            if ( !isMatch ) {
                code = HTTP_CODE_UNAUTHORIZED; 
                throw new Error("Email or password incorrect!");
            }
    
        const strJWT = await authHelper.hashTokenAccess(user.toResources())
        return resSuccess(HTTP_CODE_SUSSCESS, { "token": strJWT }, res);

    } catch (error) {
        
        resError(code || HTTP_CODE_ERROR, (error as Error).message, (error as Error), res, code);
    }

}

const registerAuth = async (req: Request, res: Response) => {

    let code = HTTP_CODE_ERROR;
    try {
        const {email, password, username} = req.body;
        const isExist = await userService.getFindUser({ email });
        if ( isExist ) {
            code = 409;
            throw new Error('Email exist!');
        }
        
        const user = await userService.create({ email, password, username });
        const strJWT = await authHelper.hashTokenAccess(user.toResources())
        let formatData = user.toResources();
        formatData.token = strJWT;
        return resSuccess(HTTP_CODE_SUSSCESS, formatData, res);
    } catch (error: any) {
        resError(code || HTTP_CODE_ERROR, (error as Error).message, (error as Error), res, code);
    }
};

const getUser = async (req: RequestWithUserRole, res: Response) => {
    let code = 500;
    try {
        const { user } = req;
        return resSuccess(HTTP_CODE_SUSSCESS, user, res)
    } catch (error) {
        resError(code || 500, (error as Error).message, (error as Error), res);
    }
}

export default {
    loginAuth,
    registerAuth,
    getUser
}