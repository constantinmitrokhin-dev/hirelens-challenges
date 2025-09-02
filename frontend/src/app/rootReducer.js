
import { combineReducers } from "redux";
import todoListReducer from "./todoListSlice";
import taskReducer from "./taskSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
	user: userReducer,
	todoLists: todoListReducer,
	tasks: taskReducer,
});

export default rootReducer;