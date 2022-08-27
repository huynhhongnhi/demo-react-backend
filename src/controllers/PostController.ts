import { resError, resSuccess } from "../commons/responseJson";
import { HTTP_CODE_ERROR, HTTP_CODE_SUSSCESS } from "../lib/constant";
import { postService } from '../services/PostService';
import { Response, Request } from "express";
import console from "console";
import { ObjectId } from "mongodb";
const fs = require('fs');
const path = require('path');

interface RequestWithUserRole extends Request {
    file: {
        path: string,
        mimetype: string
    }
} 

// all
const getAll = async (req: Request, res: Response) => {
    try {
        const page = (req.query.skip) ? req.query.skip : 0;
        const limit = (req.query.limit) ? req.query.limit : 6;
        const fetch = await postService.getAll(Number(limit), Number(page));
    
        let results: { _id: ObjectId, title: string, description: string, image: string }[] = [];
        fetch.map( post => {
            let image = ""
            if ( post.image ) {
                image = 'http://localhost:7000/images' + post.image
            }
            results.push({
                _id: post._id,
                title: post.title,
                description: post.description,
                image
            })
        });
        
        resSuccess(HTTP_CODE_SUSSCESS, results, res);
    } catch (error) {;
        resError(HTTP_CODE_ERROR, (error as Error).message, (error as Error), res);
    }
}

// create
const addPost = async (req: Request, res: Response) => {        
    try {
        const { title, description, attachments } = req.body;
        let image = "";
        if ( attachments ) {
            const base64Data = attachments.imageBase64.split(',');;
            image = Date.now() + '.' + attachments.extension;
            fs.writeFile(`${__dirname}/../../public/images` + image, base64Data[1], 'base64', function(err: any) {
                console.log(err);
            });
        }

        const fetch = await postService.add({ title, description, image });
        resSuccess(HTTP_CODE_SUSSCESS, fetch, res);
    } catch (error) {
        resError(HTTP_CODE_ERROR, (error as Error).message, (error as Error), res);
    }
};

// detail
const detailPost = async (req: Request, res: Response) => {        
    try {
        const id: string = req.params.postId;
        const fetch = await postService.getDetail(id);
        resSuccess(HTTP_CODE_SUSSCESS, fetch, res);
    } catch (error) {
        resError(HTTP_CODE_ERROR, (error as Error).message, (error as Error), res);
    }
};

// update
const updatePost = async (req: Request, res: Response) => {        
    try {
        const id = req.params.postId;
        const params = req.body;

        const fetch = await postService.update(id, params);
        resSuccess(HTTP_CODE_SUSSCESS, {}, res);
    } catch (error) {
        resError(HTTP_CODE_ERROR, (error as Error).message, (error as Error), res);
    }
};

// delete
const deletePost = async (req: Request, res: Response) => {        
    try {
        const id = req.params.postId;
        const fetch = await postService.delete(id);
        resSuccess(HTTP_CODE_SUSSCESS, {}, res);
    } catch (error) {
        resError(HTTP_CODE_ERROR, (error as Error).message, (error as Error), res);
    }
};

export default {
    getAll,
    detailPost,
    addPost,
    updatePost,
    deletePost
};