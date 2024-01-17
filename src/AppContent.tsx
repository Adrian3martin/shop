import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import AppNavigator from './AppNavigator'
import { Provider } from 'react-redux';
import store from './redux/store';

const AppContent = () => {
  
  return (
    <Provider store={store}>
      <StatusBar />
      <AppNavigator/>
    </Provider>
  )
}

export default AppContent;
