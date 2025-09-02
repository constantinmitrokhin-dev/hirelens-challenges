
const { DataTypes } = require("sequelize");
const { ALPHANUMERIC_REGEX } = require("./utils/constants");
const { TASK_NAME_ERROR } = require("./utils/Task_error_msgs");

module.exports = (sequelize) => {
	const Task = sequelize.define('Task', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: {
					args: ALPHANUMERIC_REGEX,
					msg: TASK_NAME_ERROR
				},
				notEmpty: true,
				notNull: {
					msg: TASK_NAME_ERROR
				}
			}
		},
		is_completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		timestamps: false,
		paranoid: false
	});

	Task.associate = (models) => {
		Task.belongsTo(models.TodoList, { foreignKey: 'todo_list_id', onDelete: 'CASCADE' });
	};

	return Task;
}