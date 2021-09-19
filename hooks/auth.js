import { useReducer, createContext } from 'react';

export const AuthContext = createContext();

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: {}
      };
    case 'LOAD':
      return { loading: true };
    case 'DONE':
      return { loading: false };
    default:
      throw new Error('No action defined for ' + action.type);
  }
}

export function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {props.children}
    </AuthContext.Provider>
  );
}
