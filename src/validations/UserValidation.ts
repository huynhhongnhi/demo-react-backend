import { Validator } from "node-input-validator";
import { resError } from "../commons/responseJson";
import { NextFunction, Request, Response } from "express";
import { HTTP_CODE_BAD_REQUEST } from '../lib/constant';

interface RequestWithUserRole extends Request {
    errors?: any,
}

const loginValidation = async function( req: RequestWithUserRole, res: Response, next: NextFunction ) {
    
    const validate = new Validator(req.body, {
        email   : "required|email|minLength:3|maxLength:500",
        password: "required|string|minLength:1|maxLength:1000",
    },{
        'email.required'     : ":attribute is required",
        'password.required'     : ":attribute is required"
    });
     
    const matched = await validate.check()
    if ( !matched ) {
        const error = validate.errors
        resError(HTTP_CODE_BAD_REQUEST, (error as Error).message, (error as Error), res);
    }
    next()
}

const registerValidation = async function( req: RequestWithUserRole, res: Response, next: NextFunction ) {
    
    const validate = new Validator(req.body, {
        username: "required|string|minLength:10|maxLength:100",
        email   : "required|email|minLength:20|maxLength:100",
        password: "required|string|minLength:8|maxLength:10",
    },{
        'username.required'     : ":attribute is required",
        'email.required'     : ":attribute is required",
        'password.required'     : ":attribute is required"
    });
     
    const matched = await validate.check()
    if ( !matched ) {
        const error = validate.errors
        resError(HTTP_CODE_BAD_REQUEST, (error as Error).message, (error as Error), res);
    }
    next()
}

export {
    loginValidation,
    registerValidation
}