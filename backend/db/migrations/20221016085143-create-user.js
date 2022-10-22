'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      // queryInterface.addColumn(
      //   'cars', // table name
      //   'createdBy', // new field name
      //   {
      //     type: Sequelize.STRING,
      //     allowNull: true,
      //   },
      // ),
      // queryInterface.addColumn(
      //   'cars',
      //   'updatedBy',
      //   {
      //     type: Sequelize.STRING,
      //     allowNull: true,
      //   },
      // ),
      // queryInterface.addColumn(
      //   'cars',
      //   'deletedBy',
      //   {
      //     type: Sequelize.STRING,
      //     allowNull: true,
      //   },
      // ),
    ]);
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
