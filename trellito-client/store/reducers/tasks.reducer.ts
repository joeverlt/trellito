import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface State {
  data: Task[]
  selected?: Task
}

const initialState: State = {
  data: [],
  selected: undefined
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const id = Math.floor(Math.random() * Date.now()).toString(16)
      const data = { ...action.payload, id }
      state.data.push(data)
    },
    deleteTask: (state, action: PayloadAction<Task>) => {
      const { id } = action.payload
      const tasks = state.data.filter((task: Task) => task.id != id)
      state.data = tasks
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const { id, description, title } = action.payload
      const task = state.data.find((task: Task) => task.id == id)
      if (task) {
        if (description) task.description = description
        if (title) task.title = title
      }
    },
    selectTask: (state, action: PayloadAction<Task | undefined>) => {
      state.selected = action.payload
    },
    deleteTasks: (state, action: PayloadAction<Task>) => {
      const { listId } = action.payload
      const tasks = state.data.filter((task: Task) => task.listId != listId)
      state.data = tasks
    },
    sortTask: (
      state,
      action: PayloadAction<{ from: number; to: number; listId: string }>
    ) => {
      const { from, to, listId } = action.payload
      const tasks = [...state.data.filter((task) => task.listId == listId)]
      const otherTasks = [...state.data.filter((task) => task.listId != listId)]

      const element = tasks.splice(from, 1)[0]
      tasks.splice(to, 0, element)
      state.data = tasks.concat(otherTasks)
    },
    moveTask: (
      state,
      action: PayloadAction<{
        from: number
        to: number
        id: string
        listId: string
      }>
    ) => {
      const { from, to, listId } = action.payload
      const destinationTasks = [
        ...state.data.filter((task) => task.listId == listId)
      ]
      const otherTasks = [...state.data.filter((task) => task.listId != listId)]

      const element = otherTasks.splice(from, 1)[0]
      element.listId = listId
      destinationTasks.splice(to, 0, element)
      state.data = destinationTasks.concat(otherTasks)
    }
  }
})

export const taskSelector = (state: RootState) => state.tasks.data
export const selectedTaskSelector = (state: RootState) => state.tasks.selected
export const {
  addTask,
  sortTask,
  moveTask,
  deleteTask,
  deleteTasks,
  updateTask,
  selectTask
} = tasksSlice.actions
export default tasksSlice.reducer
