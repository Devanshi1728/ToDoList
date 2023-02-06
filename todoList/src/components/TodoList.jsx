import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodoList,
  updateTodoList,
  toggleCompleted,
  sortTodoList,
} from "../Store/TodoSlice";
import { BsTrash } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";
import { useEffect } from "react";
import NoDataImage from "../assets/noData.avif";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCrieteria = useSelector((state) => state.todo.sortCrieteria);
  const [todo, setTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const handleAddTask = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(addTodoList({ task: task, id: Date.now() }));
      setNewTask("");
      setShowModal(true);
    }
    setShowModal(false);
  };

  const handleUpdate = (id, newTask) => {
    setShowModal(false);
    if (newTask.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(updateTodoList({ id: id, task: newTask }));
      setNewTask("");
      setTodo("");
      setShowModal(false);
    }
  };

  const handleSort = (sortCrieteria) => {
    dispatch(sortTodoList(sortCrieteria));
  };

  const sortTodo = todoList.filter((todo) => {
    if (sortCrieteria === "All") return true;
    if (sortCrieteria === "Completed" && todo.completed) return true;
    if (sortCrieteria === "Not Completed" && !todo.completed) return true;
  });

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  const handleDelete = (id) => {
    const updatedList = todoList.filter((i) => i.id !== id);
    dispatch(setTodoList(updatedList));
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  return (
    <div>
      {showModal && (
        <div
          className="fixed w-full h-full flex left-0 top-0 justify-center 
        items-center bg-gradient-to-b from-transparent to-purple-300"
        >
          <div className="bg-white p-8 rounded-md">
            <input
              type="text"
              placeholder={todo ? "Update your task" : "Enter your task"}
              name="todo"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              className="border p-2 rounded-md outline-none mb-8"
            />
            <div className="flex justify-between">
              {todo ? (
                <>
                  <button
                    className="bg-purple-400 rounded-md py-3 px-10 m-3 text-white"
                    onClick={() => handleUpdate(todo.id, newTask)}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-600 rounded-md py-3 px-10 m-3 text-white"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-600 rounded-md py-3 px-10 m-3 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-purple-400 rounded-md py-3 px-10 m-3 text-white"
                    onClick={() => handleAddTask(newTask)}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          <div className="mb-6">
            <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
              <img src={NoDataImage} alt="no data" />
            </div>
            <p className="text-3xl font-bold text-center text-gray-400">
              Nothing to do, Please add one
            </p>
          </div>
        ) : (
          <div className="container mx-auto mt-6">
            <div className="justify-center flex mb-6">
              <select
                className="p-1 text-sm rounded-md outline-none"
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="All" className="text-sm">
                  All
                </option>
                <option value="Completed" className="text-sm">
                  Completed
                </option>
                <option value="Not Completed" className="text-sm">
                  Not Completed
                </option>
              </select>
            </div>
            <div>
              {sortTodo.map((i) => (
                <div
                  key={i.id}
                  className="bg-purple-300 p-3 justify-between 
                  items-center w-full rounded-md mb-4 flex md:w-[75%]"
                >
                  <div
                    className={`${
                      i.completed
                        ? "line-through text-gray-600"
                        : "text-white"
                    }`}
                    onClick={() => handleToggleCompleted(i.id)}
                  >
                    <span className="flex text-lg">{i.task.charAt(0).toUpperCase() + i.task.slice(1)} </span>
                    <span className="text-xs text-purple-700">{new Date(i.id).toLocaleString("en-us")}</span>
                  </div>
                  <div>
                  <button
                    className="p-2 rounded-md ml-2 
                    bg-purple-800 text-white"
                    onClick={() => {
                      setShowModal(true);
                      setTodo(i);
                      setNewTask(i.task);
                    }}
                  >
                    <TiPencil />
                  </button>
                  <button
                    className="p-2 rounded-md ml-2 bg-gray-500 text-white"
                    onClick={() => handleDelete(i.id)}
                  >
                    <BsTrash />
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
      <button
        className="bg-purple-500 text-center text-white py-3 px-10 rounded-md"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>
      </div>
    </div>
  );
};

export default TodoList;
