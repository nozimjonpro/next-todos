import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { todos } from "@/interfaces/types";

const initialData: todos[] = [
  { id: nanoid(), title: "Wake up", status: false },
  { id: nanoid(), title: "Brush teeth", status: false },
  { id: nanoid(), title: "Have a breakfast", status: false },
];

const todosSlice = createSlice({
  name: "Todos",
  initialState: [...initialData],
  reducers: {
    addTodo: (state, action: PayloadAction<todos>) => {
      state.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<todos>) => {
      state.map((el) => {
        if (el.id === action.payload.id) {
          el.title = action.payload.title;
        }
        return el;
      });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((el) => el.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const foundTodo = state.find((el) => el.id === action.payload);
      if (foundTodo) {
        foundTodo.status = !foundTodo.status;
      }
    },
  },
});

export const { addTodo, deleteTodo, completeTodo, updateTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
