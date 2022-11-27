import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import AuthProvider from './Context/AuthProvider/AuthProvider';
import ScrollToTop from 'react-scroll-to-top';
import { BsArrowUp } from 'react-icons/bs'

// Create a client
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <AuthProvider>
        <ToastContainer position='top-right' />
        <App />
        <ScrollToTop 
          title='Scroll To Top' 
          smooth 
          component={<BsArrowUp className='text-center mx-auto text-white text-xl' />}
        />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

