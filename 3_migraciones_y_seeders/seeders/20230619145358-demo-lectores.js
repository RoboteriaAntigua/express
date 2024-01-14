'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
     await queryInterface.bulkInsert('Lectores', [{
       nombre: 'John Doe',
       email: 'lala@lala.com.ar',
       roll: 'pasajero',
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
    await queryInterface.bulkDelete('Lectores', null, {});
     
  }
};
