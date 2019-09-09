import * as React from "react"
import { Provider as DProvider } from "@draftbit/ui"
import { AppLoading } from "expo"
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import cacheAssetsAsync from "./utilities/cacheAssetsAsync"
import AppNavigator from "./AppNavigator"
import reducer from './reducers/reducer';

const store = createStore(reducer);

export default class App extends React.PureComponent {
  state = {
    isReady: false
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={cacheAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <Provider store={store}>
        <DProvider>
          <AppNavigator />
        </DProvider>
      </Provider>
    )
  }
}
