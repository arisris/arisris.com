import { createGraphQLRequest } from "./utils";

const request = createGraphQLRequest("https://graphql.us.fauna.com/graphql", {
  Authorization: "Bearer " + process.env.FAUNA_KEY
});

export const faunaGraphQLRequest = request;

export const createGuestbook = (data: {
  email: string;
  message: string;
  createdBy: string;
}) =>
  request(
    `#graphql
      mutation createGuestbook($data: Guestbook!){
        createGuestbook(data: $data) {
          _id
          message
          email
          createdBy
          createdAt
          updatedAt
        }
      }
    `,
    { data: { ...data, createdAt: new Date().toTimeString() } }
  ).then((data) => data?.createGuestbook);

export const updateGuestbook = (
  id: string,
  data: {
    email?: string;
    message?: string;
    createdBy?: string;
  }
) =>
  request(
    `#graphql
        mutation updateGuestbook($id: ID!, $data: Guestbook!){
          updateGuestbook(id: $id, data: $data) {
            _id
            message
            email
            createdBy
            createdAt
            updatedAt
          }
        }
      `,
    { id, data: { ...data, updatedAt: new Date().toTimeString() } }
  ).then((data) => data?.updateGuestbook);

export const deleteGuestbook = (id: string) =>
  request(
    `#graphql
          mutation deleteGuestbook($id: ID!){
            deleteGuestbook(id: $id) {
              _id
            }
          }
        `,
    { id }
  ).then((data) => data?.deleteGuestbook);

export const getAllGuestbook = (_size = 20) =>
  request(
    `#graphql
      query getAllGuestbook($_size: Int!){
        getAllGuestbook(_size: $_size) {
          data {
            _id
            message
            email
            createdBy
            createdAt
            updatedAt
          }
        }
      }
    `,
    { _size }
  ).then((data) => data?.getAllGuestbook?.data);
