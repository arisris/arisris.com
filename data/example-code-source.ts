export default {
  "main.js": `import React from "react";
import { createStore, useStore, StoreContext } from './useStore.js';

const store = createStore(
{
  count: 0
},
{
  increment(state, _) {
    return Promise.resolve({
      count: state.count + 1
    });
  },
  async decerment(state, _) {
    return {
      count: state.count - 1
    };
  },
  incrementBy(state, _, payload) {
    return {
      count: state.count + parseInt(payload)
    };
  }
}
);

export default function TestingPage() {
return React.createElement(StoreContext.Provider, {value: store}, [
  React.createElement(Testing, {}, null)
]);
}

function Testing() {
const [state, action] = useStore();
return React.createElement("div", {className: "m-8"}, [
  React.createElement("h3", {}, "Counter: "+state.count),
  React.createElement("button", {className: "p-1 bg-blue-100 mr-2", onClick: e => action.increment()}, "Increment"),
  React.createElement("button", {className: "p-1 bg-blue-100 mr-2", onClick: e => action.decerment()}, "Decerment"),
  React.createElement("button", {className: "p-1 bg-blue-100 mr-2", onClick: e => action.incrementBy(10)}, "Increment 10")
])
}
`,
  "useStore.js": `import { createContext, useContext, useState, useMemo } from 'react';

export const createStore = (state, actions) => {
const set = (obj) =>
  obj && typeof obj === 'object'
    ? ((state = { ...state, ...obj }), state)
    : state;
const newActions = Object.keys(actions)
  .filter((key) => typeof actions[key] === 'function')
  .reduce(
    (action, key) => (
      (action[key] = (...args) => {
        const sop = actions[key](state, action, ...args);
        return sop.then && sop.catch
          ? sop.then(set).catch(set)
          : Promise.resolve(sop).then(set);
      }),
      action
    ),
    {}
  );
return { state, actions: newActions };
};
export const StoreContext = createContext();
const customContext = (context) => () => {
const store = useContext(context);
if (process.env.NODE_ENV !== 'production' && !store)
  throw new Error('No Store Provided.');
const [state, setState] = useState(store.state);
return useMemo(() => {
  const actions = Object.keys(store.actions).reduce((a, b) => {
    const set = (s) => (setState(s), s);
    a[b] = (...args) =>
      store.actions[b](...args)
        .then(set)
        .catch(set);
    return a;
  }, {});
  return [state, actions];
}, [state]);
};
export const useStore = customContext(StoreContext);
`
  //   "config.json": `{
  //   "jsx": true
  // }`
};
