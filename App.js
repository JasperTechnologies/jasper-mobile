import * as React from "react"
import { Provider as DProvider } from "@draftbit/ui"
import { AppLoading } from "expo"
import { AppRegistry, AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import { resolvers, typeDefs } from './resolvers';
import cacheAssetsAsync from "./utilities/cacheAssetsAsync"
import AppNavigator from "./AppNavigator"
import reducer from './reducers/reducer';

const authLink = setContext(async (_, { headers }) => {
  const userToken = await AsyncStorage.getItem('userToken');
  return {
    headers: {
      ...headers,
      Authorization: userToken ? `Bearer ${userToken}` : "",
    }
  }
});

const cache = new InMemoryCache();
const HTTP_LINK = createHttpLink({ uri: "http://ec2-18-236-185-245.us-west-2.compute.amazonaws.com:4000/" });
const client = new ApolloClient({
  link: authLink.concat(HTTP_LINK),
  cache,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    cart: [],
    currentMenuCategory: null,
    currentMenuItems: [],
    currentMenuItem: null
  },
});

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
      <ApolloProvider client={client}>
        <DProvider>
          <AppNavigator />
        </DProvider>
      </ApolloProvider>
    )
  }
}
AppRegistry.registerComponent('MyApplication', () => App);
