import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: ''
}

export const todosSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    tokenAdded(state, action) {
      state.token = action.payload
    }
  }
})

const { actions, reducer } = todosSlice

export const { tokenAdded } = actions;
export default reducer
