
require('dotenv').config();
const {Sequelize, Op, Model, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_HOST, DB_SCHEMA, DB_USER, DB_PASSWORD, DB_DIALECT, DB_PORT } = process.env;
const pgtools = require('pgtools');

async function ensureDatabase() {
	try {
		await pgtools.createdb({
			user: DB_USER,
			password: DB_PASSWORD,
			port: DB_PORT,
			host: DB_HOST
		}, DB_SCHEMA);

		console.log(`✅ Database "${DB_SCHEMA}" created successfully`);
	} catch (err) {
		if (err.name === 'duplicate_database') {
			console.log(`ℹ️ Database "${DB_SCHEMA}" already exists`);
		} else {
			throw err;
		}
	}
}

const sequelize = new Sequelize(
	DB_SCHEMA, DB_USER, DB_PASSWORD,
	{
		host: DB_HOST,
		dialect: DB_DIALECT,
		port: DB_PORT,
		logging: false,
		native: false,
	},
);
// const sequelize = new Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_SCHEMA}`) // Example for postgres


const basename = path.basename(__filename);

const modelDefiners = [];

// Load all files from the Models folder, require them, and push into modelDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
	.filter(
		(file) =>
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

//	Inject sequelize connection into all models
modelDefiners.forEach((model) => model(sequelize));

// Capitalize model names, e.g. product => Product
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//* Create Associations
Object.keys(sequelize.models).forEach((modelName) => {
	if (sequelize.models[modelName].associate) {
		sequelize.models[modelName].associate(sequelize.models);
	}
});

module.exports = {
	...sequelize.models,
	Op,
	conn: sequelize,
	ensureDatabase
};
