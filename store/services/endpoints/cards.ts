import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/dist/query'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { services } from '..'
import { PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks'

interface Builder
  extends EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    'Boards' | 'Board' | 'Lists' | 'List' | 'Cards',
    'services'
  > {}

export const CardEndpoints = (builder: Builder) => ({
  addCard: builder.mutation<Card, Partial<Card>>({
    query: (body) => ({
      url: `cards`,
      method: 'POST',
      body
    }),
    invalidatesTags: ['Board']
  }),
  updateCard: builder.mutation<void, Pick<Card, 'id'> & Partial<Card>>({
    query: ({ id, ...patch }) => ({
      url: `cards/${id}`,
      method: 'PUT',
      body: patch
    }),
    invalidatesTags: ['Board']
  }),
  sortCard: builder.mutation<
    void,
    {
      from: number
      to: number
      boardId: string
      listId: string
    }
  >({
    query: (body) => ({
      url: `cards/sort`,
      method: 'POST',
      body
    }),
    invalidatesTags: ['Board'],
    onQueryStarted: (
      { boardId, listId, from, to },
      { dispatch, queryFulfilled }
    ) => {
      const patchResult: PatchCollection = dispatch(
        services.util.updateQueryData('getBoard', boardId, (draft: Board) => {
          const list: List | undefined = draft.lists.find(
            (list: List) => list.id == listId
          )
          const card: Card | undefined = list?.cards.splice(from, 1)[0]
          list?.cards.splice(to, 0, card as Card)
          Object.assign(draft, draft)
        })
      )
      queryFulfilled.catch(patchResult.undo)
    }
  }),
  moveCard: builder.mutation<
    void,
    {
      fromListId: string
      toListId: string
      boardId: string
      toPosition: number
      fromPosition: number
      cardId: string
    }
  >({
    query: (body) => ({
      url: `cards/move`,
      method: 'POST',
      body
    }),
    invalidatesTags: ['Board'],
    onQueryStarted: (
      { fromListId, toListId, boardId, toPosition, fromPosition },
      { dispatch, queryFulfilled }
    ) => {
      const patchResult: PatchCollection = dispatch(
        services.util.updateQueryData('getBoard', boardId, (draft: Board) => {
          const fromLt: List | undefined = draft.lists.find(
            (list: List) => list.id == fromListId
          )
          const toLt: List | undefined = draft.lists.find(
            (list: List) => list.id == toListId
          )
          const card: Card | undefined = fromLt?.cards.splice(
            fromPosition,
            1
          )[0]
          toLt?.cards.splice(toPosition, 0, card as Card)
          Object.assign(draft, draft)
        })
      )
      queryFulfilled.catch(patchResult.undo)
    }
  }),
  deleteCard: builder.mutation<{ success: boolean; id: string }, string>({
    query: (id) => ({
      url: `cards/${id}`,
      method: 'DELETE'
    }),
    invalidatesTags: ['Board']
  })
})
