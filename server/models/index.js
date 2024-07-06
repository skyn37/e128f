const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(path.join(__dirname, '/../config/dbConfig.json'))['development'];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
// Load models from the current directory
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Associate the models if needed
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Assign the sequelize and Sequelize objects to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;