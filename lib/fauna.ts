const request = (query: string, variables = {}) =>
  fetch("https://graphql.us.fauna.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: {
      Authorization: "Bearer " + process.env.FAUNA_KEY
    }
  })
    .then((res) => res.json())
    .catch((e) => ({ error: true, message: e.message }));

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
          createdBy
          createdAt
          updatedAt
        }
      }
    `,
    { data: { ...data, createdAt: new Date().toTimeString() } }
  ).then((json) => json.data.createGuestbook);

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
            createdBy
            createdAt
            updatedAt
          }
        }
      `,
    { id, data: { ...data, updatedAt: new Date().toTimeString() } }
  ).then((json) => json.data.updateGuestbook);

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
  ).then((json) => json.data.deleteGuestbook);

export const getAllGuestbook = (_size = 20) =>
  request(
    `#graphql
      query getAllGuestbook($_size: Int!){
        getAllGuestbook(_size: $_size) {
          data {
            _id
            message
            createdBy
            createdAt
            updatedAt
          }
        }
      }
    `,
    { _size }
  ).then((json) => json?.data?.getAllGuestbook?.data || { error: true });
