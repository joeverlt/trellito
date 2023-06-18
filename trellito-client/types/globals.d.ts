interface Task {
  id?: string
  listId?: string
  title?: string
  description?: string
}

interface List {
  id?: string
  boardId?: string
  title?: string
}

interface Board {
  id?: string
  title?: string
}
