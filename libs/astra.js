import fetchs from 'fetch-s';
export const collection = (namespace) => {
  const baseUrl = `/namespaces/${
    namespace ? namespace : process.env.ASTRA_DB_KEYSPACE
  }/collections/`;
  return createRestClient(baseUrl);
};
export const schemas = createRestClient(`/schemas/keyspaces/`);
export const data = createRestClient(`/keyspaces/`);
function createRestClient(base) {
  const origin = `https://${process.env.ASTRA_DB_HOST}/api/rest/v2`;
  const headers = {
    'X-Cassandra-Token': process.env.ASTRA_CLIENT_TOKEN,
    'X-Requested-With': '@astrajs/rest'
  };
  const obj = {};
  obj.baseUrl = origin + base;
  for (let method of ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']) {
    Object.defineProperty(obj, method.toLowerCase(), {
      value: function(pathname, data = {}) {
        if (method === 'GET') {
          Object.keys(data).forEach((i) => {
            data[i] = JSON.stringify(data[i]);
          });
        }
        return fetchs.request({
          url: base + pathname,
          origin,
          method,
          data,
          headers
        });
      },
      enumerable: true
    });
  }
  return obj;
}
