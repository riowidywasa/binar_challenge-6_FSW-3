const { User } = require('../models');

module.exports = {
    create(body){
        return User.create(body)
    },

    findUser(email){
        return User.findOne({where:email})
    },

    getAllUser(){
        return User.findAll();
    },

    getCountUser(){
        return User.count();
    },

    findUserByPk(id){
        return User.findByPk(id);
    },

}

// npx sequelize-cli model:generate --name Users --attributes email:string,password:string,name:string,status:string