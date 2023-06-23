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

export const ListEndpoints = (builder: Builder) => ({
  addList: builder.mutation<List, Partial<List>>({
    query: (body) => ({
      url: `lists`,
      method: 'POST',
      body
    }),
    invalidatesTags: ['Board']
  }),
  updateList: builder.mutation<void, Pick<List, 'id'> & Partial<List>>({
    query: ({ id, ...patch }) => ({
      url: `lists/${id}`,
      method: 'PUT',
      body: patch
    }),
    invalidatesTags: ['Board']
  }),
  sortList: builder.mutation<
    void,
    { from: number; to: number; boardId: string }
  >({
    query: (body) => ({
      url: `lists/sort`,
      method: 'POST',
      body
    }),
    invalidatesTags: ['Board'],
    onQueryStarted: ({ boardId, from, to }, { dispatch, queryFulfilled }) => {
      const patchResult: PatchCollection = dispatch(
        services.util.updateQueryData('getBoard', boardId, (draft: Board) => {
          const element = draft.lists.splice(from, 1)[0]
          draft.lists.splice(to, 0, element)
          Object.assign(draft, draft)
        })
      )
      queryFulfilled.catch(patchResult.undo)
    }
  }),
  deleteList: builder.mutation<{ success: boolean; id: string }, string>({
    query: (id) => ({
      url: `lists/${id}`,
      method: 'DELETE'
    }),
    invalidatesTags: ['Board']
  })
})
