import React, { createContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload };
    case 'LOGOUT':
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (state.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [state.currentUser]);

  const login = (user) => {
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <UserContext.Provider value={{ currentUser: state.currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };