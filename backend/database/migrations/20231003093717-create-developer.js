'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Developer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      developerNumber: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      },
      registrationNumber: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('FEMALE','MALE'),
        allowNull: false,
        defaultValue: "MALE"
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      otherNames: {
        type: Sequelize.STRING(80),
        allowNull: true
      },
      imagePath: {
        type: Sequelize.STRING(300),
        allowNull: true,
        unique: true
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: true
      },
      telephone: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Developer');
  }
};