/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import CurrencyConverter from './views/CurrencyConverter';

const styles = {
  backgroundColor: '#FAFDF6',
};

const App = () => {
  return (
    <SafeAreaView style={styles}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles}
      />
      <CurrencyConverter />
    </SafeAreaView>
  );
};

export default App;
