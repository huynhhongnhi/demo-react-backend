import { Response } from "express";

const resSuccess = (code: number, data: any, res: Response, codeHttp: number = 200) => {
    return res.status(codeHttp).json({
        code,
        success: true,
        message: "success",
        data
    })
}

const resError = (code: number, message: string, error: object, res: Response, codeHttp: number = 500) => {
    return res.status(codeHttp).json({
        code,
        success: false,
        message,
        error
    })
}

export {
    resSuccess,
    resError
}