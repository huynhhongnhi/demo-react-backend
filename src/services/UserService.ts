import User from "../models/UserModel";

class UserService {
    
    public create(params: object) {
        const user = new User(params);
        return user.save();
    };

    public getFindUser(param: object) {
        return User.findOne(param);
    };

}
  
const userService = new UserService();
export { userService };