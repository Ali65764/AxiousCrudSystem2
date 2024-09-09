import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalContextProvider } from './stores/GlobalContext';
import { BrowserRouter } from 'react-router-dom'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(

  <GlobalContextProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </GlobalContextProvider>
);





