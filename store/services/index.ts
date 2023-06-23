import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BoardEndpoints } from './endpoints/boards'
import { ListEndpoints } from './endpoints/lists'
import { CardEndpoints } from './endpoints/cards'

type ServiceTagTypes = 'Boards' | 'Lists' | 'Cards' | 'Board'

const baseUrl = process.env.API_URL

export const services = createApi({
  reducerPath: 'services',
  tagTypes: ['Boards', 'Lists', 'Cards', 'Board'] as ServiceTagTypes[],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    ...BoardEndpoints(builder),
    ...ListEndpoints(builder),
    ...CardEndpoints(builder)
  })
})

export const {
  useGetBoardQuery,
  useGetBoardsQuery,
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useAddListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useSortListMutation,
  useAddCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useSortCardMutation,
  useMoveCardMutation
} = services
