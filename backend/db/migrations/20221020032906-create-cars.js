'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // return Promise.all([
    //   queryInterface.addColumn(
    //     'cars', // table name
    //     'deletedAt', // new field name
    //     {
    //       type: Sequelize.STRING,
    //       allowNull: true,
    //     },
    //   ),
    // ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
