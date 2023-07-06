import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/rootReducer';
import { ApolloProvider } from '@apollo/client';
import client from './client/graphql/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: rootReducer,
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
