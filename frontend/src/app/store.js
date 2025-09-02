
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import userReducer from "./userSlice";
import todoListReducer from "./todoListSlice";
import taskReducer from "./taskSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user"], // solo persisto user (el token)
};

const rootReducer = combineReducers({
	user: userReducer,
	todoLists: todoListReducer,
	tasks: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);