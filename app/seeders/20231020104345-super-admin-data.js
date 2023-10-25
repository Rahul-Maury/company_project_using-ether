
const ethers = require('ethers');
const obj={ Name:"superAdmin",
  email: "superAdmin@gmail.com",
  role: "superadmin",
  createdAt: new Date(),
  updatedAt:new Date()
};
const wallet = ethers.Wallet.createRandom();
const pr = wallet.privateKey;
const publicKey = wallet.signingKey.publicKey;
obj.publicKey=publicKey


module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log("privateKey", pr);
    return queryInterface.bulkInsert('users', [obj])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};