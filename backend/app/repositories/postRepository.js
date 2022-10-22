const { cars } = require("../models");

module.exports = {
    create(body) {
        return cars.create(body);
    },

    update(id, body) {
        return cars.update(body, {where:{id}});
    },

    delete(id) {
    return cars.destroy({where:{id}});
    },

    getById(id) {
        return cars.findByPk(id);
    },

    getAll() {
        return cars.findAll();
    },

    getTotalCount() {
        return cars.count();
    },

    getSize(size){
        return cars.findAll({where:{size:size}})
    }
};