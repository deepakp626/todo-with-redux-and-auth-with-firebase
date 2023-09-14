import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  value: []
}

export const TodoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const deleteIndex = action.payload;
      state.value.splice(deleteIndex,1)
    },
    editTodo: (state, action) => {
      const {todoIndex, updateTask} = action.payload
      void(state.value[todoIndex] = updateTask)
    },
    getTodo: (state) => { 
      console.log("state value", state.value)
      return state.value
    }
  },
});

export const { addTodo, deleteTodo,editTodo ,getTodo} = TodoSlice.actions;

export default TodoSlice.reducer;
