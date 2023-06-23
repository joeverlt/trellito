import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/dist/query'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

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

export const BoardEndpoints = (builder: Builder) => ({
  getBoard: builder.query<Board, string>({
    query: (id) => `boards/${id}`,
    providesTags: ['Board']
  }),
  getBoards: builder.query<Board[], void>({
    query: () => `boards`,
    providesTags: ['Boards']
  }),
  addBoard: builder.mutation<Board, Partial<Board>>({
    query: (body) => ({
      url: `boards`,
      method: 'POST',
      body
    }),
    invalidatesTags: ['Boards']
  }),
  updateBoard: builder.mutation<void, Pick<Board, 'id'> & Partial<Board>>({
    query: ({ id, ...patch }) => ({
      url: `boards/${id}`,
      method: 'PUT',
      body: patch
    })
  }),
  deleteBoard: builder.mutation<{ success: boolean; id: string }, string>({
    query: (id) => ({
      url: `boards/${id}`,
      method: 'DELETE'
    }),
    invalidatesTags: ['Boards']
  })
})
