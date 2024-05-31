// App.js
import React from 'react';
import AppNavigator from './Navigation/AppNavigator';
import RouteDataProvider from './Hooks/RouteDataProvider';

const App = () => {
  return (
    <RouteDataProvider>
      <AppNavigator />
    </RouteDataProvider>
  );
};

export default App;
