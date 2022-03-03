import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "lib/utils";
import { graphqlBaseQuery } from "./utils";

const guestbookApi = createApi({
  reducerPath: "guestbookApi",
  baseQuery: graphqlBaseQuery,
  endpoints: (builder) => ({
    getAllGuestbook: builder.query<any, any>({
      query: () => ({
        query: gql`
          query {
            listGuestbook {
              key
              name
              image
              email
              body
              private
              created_at
            }
          }
        `
      }),
      transformResponse: (res) => res?.data?.listGuestbook
    }),
    storeGuestbook: builder.mutation<any, { private?: boolean; body: string }>({
      query: (input) => ({
        query: gql`
          mutation storeGuestbook($input: StoreGuestbookInput!) {
            storeGuestbook(input: $input) {
              key
            }
          }
        `,
        variables: { input }
      }),
      transformResponse: (res) => res?.data?.storeGuestbook
    }),
    destroyGuestbook: builder.mutation<any, string>({
      query: (key) => ({
        query: gql`
          mutation destroyGuestbook($key: String!) {
            destroyGuestbook(key: $key)
          }
        `,
        variables: { key }
      }),
      transformResponse: (res) => res?.data?.destroyGuestbook
    })
  })
});

export const { useGetAllGuestbookQuery, useStoreGuestbookMutation, useDestroyGuestbookMutation } =
  guestbookApi;
export default guestbookApi;
