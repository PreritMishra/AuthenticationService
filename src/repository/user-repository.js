const { User } = require('../models/index');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            console.log(user);
            return user;
        } catch (error) {
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
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer in fetching the email");
            throw {error};
        }
    }
}

module.exports = UserRepository;