'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique:true,
        validate: {
          isLowercase: true,
          customValidator(value) {
              if (value !== value.toLowerCase()) {
                  throw new Error("email must be lowerCase");
              }
          }
    }
      },
      role: {
        type: Sequelize.ENUM('superadmin', 'admin', 'employee'),
        allowNull: false,
        isLowercase: true,
      },
      company_id: {

        type: Sequelize.INTEGER,
        references: {
          model: 'companies', 
          key: 'id'       
        },
       
      
      },
      created_by: Sequelize.INTEGER,
      publicKey: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE,
        allowNull:false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull:false
      },
     
    });
  },

  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};