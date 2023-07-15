"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addTodo,
  updateTodo,
  deleteTodo,
  completeTodo,
} from "@/redux/todosSlice";
import { nanoid } from "nanoid";
import { useState } from "react";
import { todos } from "@/interfaces/types";

export default function Home() {
  const todos = useSelector((state: RootState) => state.todos);

  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const [isClicked, setIsClicked] = useState<todos | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    dispatch(completeTodo(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const elInput = e.target as HTMLInputElement;

    if (!elInput?.value) {
      return;
    }
    let newTodo = {
      id: nanoid(),
      title: elInput.value,
      status: false,
    };

    if (e?.code === "Enter" && !isClicked) {
      dispatch(addTodo(newTodo));
      setValue("");
    }

    if (e.code === "Enter" && isClicked) {
      let todo = {
        id: isClicked?.id,
        title: value,
        status: isClicked?.status,
      };
      dispatch(updateTodo(todo));
      setValue("");
      setIsClicked(null);
    }
  };

  const hadnleUpdate = (el: todos) => {
    setIsClicked(el);
    setValue(el.title);
  };

  const handleClick = () => {
    let newTodo = {
      id: nanoid(),
      title: value,
      status: false,
    };

    if (value) {
      dispatch(addTodo(newTodo));
      setValue("");
    }
  };

  return (
    <main className=" bg-main max-h-screen">
      <div className="max-w-xl mx-auto pt-10 px-4">
        <h1 className="sm:text-6xl text-3xl text-center font-semibold text-heading sm:mb-8 mb-5">
          Todos
        </h1>
        <label className="relative h-max block">
          <input
            className={`w-full sm:text-2xl text-lg outline-none rounded p-4 pl-10 pr-16 placeholder:opacity-20 ${
              todos.length ? "shadow-initialShadow" : "shadow-inputShadow"
            }`}
            type="text"
            placeholder="todos..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={handleAddTodo}
          />
          <button
            className="absolute top-0 right-0 border-l border-borderLine px-3 bg-white rounded text-lg sm:text-xl h-full shadow-initialShadow text-slate-400 outline-none"
            onClick={handleClick}
          >
            Add
          </button>
        </label>

        <ul className="flex flex-col bg-white">
          {todos.length > 0 &&
            todos.map((el) => (
              <li
                className="border-b border-borderLine sm:text-2xl text-lg p-4 flex justify-between items-center"
                key={el.id}
                onDoubleClick={() => hadnleUpdate(el)}
              >
                <div className="flex gap-x-4 items-center">
                  <label>
                    <span
                      className="sm:w-8 sm:h-8 w-5 h-5 block rounded-full border border-borderLine"
                      style={{ backgroundColor: el.status ? "#3cc" : "" }}
                    ></span>
                    <input
                      className="hidden"
                      type="checkbox"
                      onChange={(e) => handleChange(e, el.id)}
                    />
                  </label>
                  <p
                    className={`${el.status ? "line-through opacity-40" : ""}`}
                  >
                    {el.title}
                  </p>
                </div>
                <button
                  className="sm:text-2xl text-lg font-semibold text-end"
                  onClick={() => handleDelete(el.id)}
                >
                  &times;
                </button>
              </li>
            ))}
        </ul>
        <div
          className="buttons"
          style={{ display: todos.length ? "block" : "none" }}
        >
          <p className="sm:text-xl text-base opacity-60">
            {todos.length} items left
          </p>
        </div>
      </div>
    </main>
  );
}
