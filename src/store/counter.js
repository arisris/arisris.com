export default function Counter(store) {
  store.on("@init", () => ({ count: 0 }));
  store.on("count/increment", (state) => {
    return {
      count: state.count + 1,
    };
  });
  store.on("count/decrement", (state) => {
    return {
      count: state.count - 1,
    };
  });
}
