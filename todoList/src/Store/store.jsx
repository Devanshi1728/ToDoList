import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./TodoSlice";

const store = configureStore({
    reducer: {
        todo: TodoReducer
    },
});

export default store;