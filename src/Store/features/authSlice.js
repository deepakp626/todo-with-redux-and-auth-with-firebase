import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  userInfo: {
    email: null,
  }, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false,
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state, actions) => {
      console.log(actions.payload.user.accessToken);

      const { accessToken } = actions.payload.user
      state.userToken = accessToken;
      state.loading = false;
    },
    logout: (state, actions) => {
      state.userToken = null;
      console.log(state, actions)
    },
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer