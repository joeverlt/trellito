interface Card {
  id?: string
  title?: string
  description?: string
  position?: number
  list?: string
}

interface List {
  id?: string
  title?: string
  position?: number
  board?: string
  cards: Card[]
}

interface Board {
  id?: string
  title?: string
  description?: string
  owner?: string
  lists: List[]
}
