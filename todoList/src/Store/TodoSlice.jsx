import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoList: [],
    sortCrieteria: 'All'
};

const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodoList: (state, action) => {
            state.todoList = action.payload;
        },
        addTodoList: (state, action) => {
            state.todoList.push({
                task: action.payload.task,
                id: action.payload.id,
                completed: false
            })
        },
        sortTodoList: (state, action) => {
            state.sortCrieteria = action.payload;
        },
        updateTodoList: (state, action) => {
            const {id, task } = action.payload;
            const index = state.todoList.findIndex(todo => todo.id === id);
            state.todoList[index].task = task;
        },
        toggleCompleted: (state, action) => {
            const { id } = action.payload;
            const index = state.todoList.findIndex(todo => todo.id === id);
            state.todoList[index].completed = !state.todoList[index].completed;
        },
    },
});

export const { setTodoList, addTodoList, sortTodoList, 
    updateTodoList, toggleCompleted } = TodoSlice.actions;

export default TodoSlice.reducer;