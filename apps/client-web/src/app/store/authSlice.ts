import { createSlice } from '@reduxjs/toolkit'


const user = localStorage.getItem("user");

const initialState = user
  ? { isLoggedIn: true, user: JSON.parse(user) }
  : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
        state.isLoggedIn = true
        state.user = action.payload
    },
    loginFailed(state) {
        state.isLoggedIn = false
        state.user = null
    },
    logout(state) {
        state.isLoggedIn = false
        state.user = null
    }

  }
})

const { actions, reducer } = authSlice

export const { loginSuccess, loginFailed, logout } = actions;
export default reducer
