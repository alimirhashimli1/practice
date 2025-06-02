'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add "username" column to the "Users" table
    await queryInterface.addColumn('Users', 'username', {
      type: Sequelize.STRING,
      allowNull: true, // or false if it's required
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove "username" column if the migration is rolled back
    await queryInterface.removeColumn('Users', 'username');
  }
};
