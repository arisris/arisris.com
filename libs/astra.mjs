import { createClient } from '@astrajs/collections';
let client;
export async function documentDB() {
  const NAMESPACE = process.env.ASTRA_DB_NAMESPACE;
  let out;
  if (!client) {
    client = await createClient({
      astraDatabaseId: process.env.ASTRA_DB_ID,
      astraDatabaseRegion: process.env.ASTRA_DB_REGION,
      applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN
    });
  }
  if (arguments.length > 1) {
    out = await client.namespace(arguments[0]).collection(arguments[1]);
  } else if (arguments.length === 1) {
    out = await client.namespace(NAMESPACE).collection(arguments[0]);
  } else {
    out = await client.namespace(NAMESPACE);
  }
  return out;
}
export const documentToArray = (d) => {
  const keys = Object.keys(d);
  if (keys.length) {
    return keys.reduce((a, b) => {
      if (typeof d[b] === 'object') {
        // only if object
        a.push({ documentId: b, ...d[b] });
      }
      return a;
    }, []);
  }
  return [];
};
