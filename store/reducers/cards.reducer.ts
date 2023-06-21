import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface State {
  data: Card[]
  selected?: Card
}

const initialState: State = {
  data: [],
  selected: undefined
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      const id = Math.floor(Math.random() * Date.now()).toString(16)
      const data = { ...action.payload, id }
      state.data.push(data)
    },
    deleteCard: (state, action: PayloadAction<Card>) => {
      const { id } = action.payload
      const cards = state.data.filter((card: Card) => card.id != id)
      state.data = cards
    },
    updateCard: (state, action: PayloadAction<Card>) => {
      const { id, description, title } = action.payload
      const card = state.data.find((card: Card) => card.id == id)
      if (card) {
        if (description) card.description = description
        if (title) card.title = title
      }
    },
    selectCard: (state, action: PayloadAction<Card | undefined>) => {
      state.selected = action.payload
    },
    deleteCards: (state, action: PayloadAction<Card>) => {
      const { list } = action.payload
      const cards = state.data.filter((card: Card) => card.list != list)
      state.data = cards
    },
    sortCard: (
      state,
      action: PayloadAction<{ from: number; to: number; list: string }>
    ) => {
      const { from, to, list } = action.payload
      const cards = [...state.data.filter((card) => card.list == list)]
      const otherCards = [...state.data.filter((card) => card.list != list)]

      const element = cards.splice(from, 1)[0]
      cards.splice(to, 0, element)
      state.data = cards.concat(otherCards)
    },
    moveCard: (
      state,
      action: PayloadAction<{
        from: number
        to: number
        id: string
        list: string
      }>
    ) => {
      const { from, to, list } = action.payload
      const destinationCards = [
        ...state.data.filter((card) => card.list == list)
      ]
      const otherCards = [...state.data.filter((card) => card.list != list)]

      const element = otherCards.splice(from, 1)[0]
      element.list = list
      destinationCards.splice(to, 0, element)
      state.data = destinationCards.concat(otherCards)
    }
  }
})

export const cardSelector = (state: RootState) => state.cards.data
export const selectedCardSelector = (state: RootState) => state.cards.selected
export const {
  addCard,
  sortCard,
  moveCard,
  deleteCard,
  deleteCards,
  updateCard,
  selectCard
} = cardsSlice.actions
export default cardsSlice.reducer
