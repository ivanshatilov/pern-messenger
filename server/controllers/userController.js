const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models.js');

class UserController {

    
    async registration(req, res, next) {
        try {
            const {email, username, password} = req.body;
            if(!password || !email || !username) {
                return next(ApiError.badRequest('Invalid credentials'));
            }
            const emailCandidate = await User.findOne({where: {email}});
            const usernameCandidate = await User.findOne({where: {username}});
            if(emailCandidate || usernameCandidate) {
                return next(ApiError.badRequest('User already exists'));
            }
    
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, username, password: hashPassword});
            const token = getJwtToken(user.id, user.email, user.username);
    
            return res.json({token});
        } catch (e) {
            next(ApiError.internalError('Internal server error'));
        }
    }
    async login(req, res, next) {
        try {
            const {email, username, password} = req.body;

            if(!password && !email || !password && !username) {
                return next(ApiError.internalError('Invalid credentials'));
            }

            let user;

            if(email) {
                user = await User.findOne({where: {email}});
            } else {
                user = await User.findOne({where: {username}});
            }

            if(!user) {
                return next(ApiError.internalError('Invalid credentials'));
            }

            const comparePassword = bcrypt.compareSync(password, user.password);
            if(!comparePassword) {
                return next(ApiError.internalError('Invalid credentials'));
            }

            const token = getJwtToken(user.id, user.email, user.username);

            return res.json({token});

        } catch (e) {
            next(ApiError.internalError('Internal server error'));
        }
    }
    async checkIsAuth(req, res, next) {
        try {
            const token = getJwtToken(req.user.id, req.user.email, req.user.username);
            return res.json({token});
        } catch (e) {
            next(ApiError.internalError("Internal server error"));
        }
    }
}

const getJwtToken = (id, email, username) => {
    return jwt.sign(
        {id: id, email: email, username: username},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}

module.exports = new UserController();