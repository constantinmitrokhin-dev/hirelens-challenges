
const { DataTypes } = require("sequelize");
const { TODOLIST_NAME_ERROR } = require("./utils/TodoList_error_msgs");

module.exports = (sequelize) => {
	const TodoList = sequelize.define('TodoList', {
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
				notEmpty: true,
				notNull: {
					msg: TODOLIST_NAME_ERROR
				}
			}
		}
	}, {
		timestamps: false,
		paranoid: false
	});

	TodoList.associate = (models) => {
		TodoList.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
		TodoList.hasMany(models.Task, { foreignKey: 'todo_list_id' });
	};

	return TodoList;
};


