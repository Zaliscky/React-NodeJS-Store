import React, { createContext } from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import UserStore  from './store/UserStore'
import DeviceStore  from './store/DeviceStore'

export const Context = createContext(null)

//console.log(process.env.REACT_APP_API_URL)

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore()
    }}>
           <App />
    </Context.Provider>,
);