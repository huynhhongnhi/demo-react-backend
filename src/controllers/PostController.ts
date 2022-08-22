import { resError, resSuccess } from "../commons/responseJson";
import { HTTP_CODE_ERROR, HTTP_CODE_SUSSCESS } from "../lib/constant";
import { postService } from '../services/PostService';
import { Response, Request } from "express";

// all
const getAll = async (req: Request, res: Response) => {
    try {
        const page = (req.query.skip) ? req.query.skip : 0;
        const limit = (req.query.limit) ? req.query.limit : 6;
        const fetch = await postService.getAll(Number(limit), Number(page));
        resSuccess(HTTP_CODE_SUSSCESS, fetch, res);
    } catch (error) {;
        resError(HTTP_CODE_ERROR, (error as Error).message, (error as Error), res);
    }
}

// create
const addPost = async (req: Request, res: Response) => {        
    try {
        const { title, description } = req.body;
        const fetch = await postService.add({ title, description });
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