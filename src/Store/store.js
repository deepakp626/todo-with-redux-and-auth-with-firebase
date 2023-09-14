import { configureStore } from '@reduxjs/toolkit'
import TodoSlice  from './counterSlice'
import authSlice from './features/authSlice'

export const store = configureStore({
  reducer: {
    todoList : TodoSlice,
    userAndAuth:authSlice,
  },
})