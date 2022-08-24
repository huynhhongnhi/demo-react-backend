import PostModel from '../models/PostModel';

interface PostInterface {
    title: string,
    description: string,
    image: string
}

class PostService {

    public getAll(
        limit: number,
        skip: number
    ) {
        return PostModel.find().select(`_id title description, image`).limit(limit).skip(skip).sort({ "_id": -1 });
    };

    public add( { title, description, image }: PostInterface) {
        const post = new PostModel({ title, description, image });
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
