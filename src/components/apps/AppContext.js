import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import {

} from './AppService';
import { UserContext } from '../users/UserContext';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const { children } = props;
  

  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}
