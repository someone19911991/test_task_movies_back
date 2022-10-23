const UserService = require('../services/UserService');

class UserController {
    async createUser(req, res, next){
        try{
            const user = await UserService.createUserIfNotExists(req.body.name);
            return res.json(user);
        }catch(err){
            next(err);
        }
    }
}

module.exports = new UserController();
