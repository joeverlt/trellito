import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface State {
  data: Board[]
}

const initialState: State = {
  data: []
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      const id: string = Math.floor(Math.random() * Date.now()).toString(16)
      const data: Board = { ...action.payload, id }
      state.data.push(data)
    },
    deleteBoard: (state, action: PayloadAction<Board>) => {
      const { id } = action.payload
      const boards = state.data.filter((board: Board) => board.id != id)
      state.data = boards
    },
    updateBoard: (state, action: PayloadAction<Task>) => {
      const { id, title } = action.payload
      const board = state.data.find((board: Board) => board.id == id)
      if (board) board.title = title
    }
  }
})

export const boardSelector = (state: RootState) => state.boards.data
export const { addBoard, deleteBoard, updateBoard } = boardsSlice.actions
export default boardsSlice.reducer
