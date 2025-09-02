
const { DataTypes } = require("sequelize");
const { USER_USERNAME_REGEX, ALPHA_REGEX } = require("./utils/constants");
const { USER_USERNAME_ERROR, USER_NAME_ERROR, USER_LASTNAME_ERROR, USER_EMAIL_ERROR } = require("./utils/User_error_msgs");

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
				is: {
					args: USER_USERNAME_REGEX,
					msg: USER_USERNAME_ERROR
				}
			}
		},
		password_hash:{
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: {
					args: ALPHA_REGEX,
					msg: USER_NAME_ERROR
				}
			}
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				is: {
					args: ALPHA_REGEX,
					msg: USER_LASTNAME_ERROR
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: {
					msg: USER_EMAIL_ERROR
				}
			}
		}
	}, {
		timestamps: false,
		paranoid: false
	});

	User.associate = (models) => {
		User.hasMany(models.TodoList, { foreignKey: 'user_id', onDelete: 'CASCADE' });
	};

	return User;
}