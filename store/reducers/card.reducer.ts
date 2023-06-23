import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..'

interface State {
  selected?: Card
}

const initialState: State = {
  selected: undefined
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<Card | undefined>) => {
      state.selected = action.payload
    }
  }
})

export const selectedCardSelector = (state: RootState) => state.card.selected
export const { selectCard } = cardsSlice.actions
export default cardsSlice.reducer
