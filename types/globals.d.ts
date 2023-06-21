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
}

interface Board {
  id?: string
  title?: string
  description?: string
  owner?: string
}
