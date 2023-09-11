const { StatusCodes } = require('http-status-codes');
const { User,Role } = require('../models/index');
const ClientError = require('../utils/client-error');
const ValidationError = require('../utils/validation-error');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            console.log(user);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            
            console.log("Something went wrong in repository layer");
            throw {error};
        }
    }
    async destroy(userId){
        try {
            const user = await User.destroy({
                where: {
                    id: userId
                }
            }); 
            return true;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw {error};
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            return user; 
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw {error};
        }
    }

    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({where: {
                email: userEmail
            }});
            console.log(user);
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent in the request',
                    'Pleasr check the email,as there is no record of the email',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
            
        } catch (error) {
            console.log("Something went wrong in repository layer in fetching the email");
            throw {error};
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                   name: 'ADMIN' 
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong in repository layer ");
            throw {error};
        }
    }
}

module.exports = UserRepository;