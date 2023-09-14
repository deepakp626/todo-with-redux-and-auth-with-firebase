import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from "./Theme/theme.js"
import { store } from "./Store/store.js"
import { Provider } from 'react-redux'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ToastContainer />
          <App />
        </ChakraProvider>
      </Provider>
    
  </React.StrictMode>,
)
