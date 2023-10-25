'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_email: {
        type: Sequelize.STRING,
    
        unique: true,
        validate: {
          isLowercase: true,
          customValidator(value) {
            if (value !== value.toLowerCase()) {
              throw new Error("email must be lowerCase");
            }
          }
        }
     
      },
      company_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_logo: {
        type: Sequelize.STRING
      },
      company_description: {
        type: Sequelize.TEXT,
        allowNull: false
        
      },
 
 
      publicKey: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    
      superadmin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        
      }
      ,
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      
  
    })
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  }
};
