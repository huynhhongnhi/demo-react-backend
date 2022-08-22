import PostModel from '../models/PostModel';

interface PostInterface {
    title: number,
    description: number
}

class PostService {

    public getAll(
        limit: number,
        skip: number
    ) {
        console.log(limit)
        console.log(skip)
        return PostModel.find().select(`_id title description`).limit(limit).skip(skip).sort({ "_id": -1 });
    };

    public add( { title, description }: PostInterface) {
        const post = new PostModel({ title, description });
        const add = post.save();
        return add;
    };

    public getDetail = (id: string) => {
        return PostModel.findById(id);
    };

    public update = (id: string, params: object) => {
        return PostModel.updateOne({ _id: id }, { $set:params });
    };

    public delete = (id: string) => {
        return PostModel.deleteOne({_id: id});
    };
}

const postService = new PostService();
export { postService };
