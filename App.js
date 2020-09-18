import React from 'react';
import Main from './components/MainComponent';
import {provider, Provider }from 'react-redux';
import {configureStore, ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

