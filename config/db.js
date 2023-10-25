const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('project', 'postgres', "12345", {
    host: 'localhost',
    dialect: 'postgres',
    timezone: '+05:30',
});


async function abc() {
    try {
        await sequelize.authenticate();

    }
    catch (err) {
        console.log("unable to conntect with database");
    }
}

abc();
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.empModel = require('../app/model/Employees')(sequelize, Sequelize);
db.userModel = require('../app/model/User')(sequelize, Sequelize);
db.superModel = require('../app/model/Superadmin')(sequelize, Sequelize);
db.companyModel = require('../app/model/Companies')(sequelize, Sequelize);

module.exports = db;