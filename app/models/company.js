'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class company extends Model {
   
    static associate(models) {
      
      company.hasMany(models.user,{
        foreignKey: 'company_id',
        constraints:false,
        cascade:'delete',
      
      }
      )

      // company.hasMany(models.user, {
      //   foreignKey: 'company_id'
   
      // });
    }
  }
  company.init({
    company_name: DataTypes.STRING,
    company_email: DataTypes.STRING,
    company_address:DataTypes.STRING,
    company_logo:DataTypes.STRING,
    company_description: DataTypes.TEXT,    
    publicKey:DataTypes.STRING,    
    superadmin_id:DataTypes.INTEGER
  },
    {
    sequelize,
    modelName: 'company',
  });
  return company;
};