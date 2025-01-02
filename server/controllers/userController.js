const ApiError = require("../error/ApiError");

class UserController {
    async registration(req, res) {
        
    }
    async login(req, res) {

    }
    async checkIsAuth(req, res, next) {
        const {id} = req.query;
        if(!id) {
           return next(ApiError.badRequest("Ne zadan id"));
        }
        res.status(200).json({"message": id})
    }
}

module.exports = new UserController();