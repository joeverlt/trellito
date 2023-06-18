import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface State {
  data: List[]
}

const initialState: State = {
  data: []
}

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<List>) => {
      const id = Math.floor(Math.random() * Date.now()).toString(16)
      const data = { ...action.payload, id }
      state.data.push(data)
    },
    updateList: (state, action: PayloadAction<Task>) => {
      const { id, title } = action.payload
      const list = state.data.find((list: List) => list.id == id)
      if (list) list.title = title
    },
    deleteList: (state, action: PayloadAction<List>) => {
      const { id } = action.payload
      const lists = state.data.filter((list: List) => list.id != id)
      state.data = lists
    },
    sortList: (
      state,
      action: PayloadAction<{ from: number; to: number; boardId: string }>
    ) => {
      const { from, to, boardId } = action.payload
      const lists = [...state.data.filter((list) => list.boardId == boardId)]
      const otherLists = [
        ...state.data.filter((list) => list.boardId != boardId)
      ]
      const element = lists.splice(from, 1)[0]
      lists.splice(to, 0, element)
      state.data = lists.concat(otherLists)
    }
  }
})

export const listSelector = (state: RootState) => state.lists.data
export const { addList, deleteList, sortList, updateList } = listsSlice.actions
export default listsSlice.reducer
