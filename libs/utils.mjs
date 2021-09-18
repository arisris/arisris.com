export const objectToArray = (d) => {
  const keys = Object.keys(d);
  if (keys.length) {
    return keys.reduce((a, b) => {
      a.push({ _key: b, ...d[b] });
      return a;
    }, []);
  }
  return [];
};
