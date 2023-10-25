'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.company, {
        foreignKey: 'company_id',
        cascade: 'delete',
        constraints:false
        })
      
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,   
    role: DataTypes.ENUM('superadmin', 'admin', 'employee'),
    company_id:DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    publicKey:DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};