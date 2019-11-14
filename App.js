import * as React from "react"
import globals from "./global";
import { Provider as DProvider } from "@draftbit/ui"
import { AppLoading } from "expo"
import { AppRegistry, AsyncStorage } from 'react-native';
import { ApolloClient, ApolloLink } from 'apollo-boost'
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { WEBSERVER_URI } from 'react-native-dotenv';
import { resolvers, typeDefs } from './resolvers';
import cacheAssetsAsync from "./utilities/cacheAssetsAsync"
import AppNavigator from "./AppNavigator"
import { onError } from "apollo-link-error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
  const userToken = await AsyncStorage.getItem('userToken');

  return {
    headers: {
      ...headers,
      Authorization: userToken ? `Bearer ${userToken}` : "",
    }
  }
});

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    console.log(object.__typename)
    switch (object.__typename) {
      case 'MenuItemForm': return object.formId; // use the `key` field as the identifier
      default: return object.id; // fall back to default handling
    }
  }
});
const HTTP_LINK = createHttpLink({ uri: WEBSERVER_URI });
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, HTTP_LINK]),
  cache,
  typeDefs,
  resolvers,
});

cache.writeData({
  data: {
    cart: [],
    newlyAddedItems: [],
    currentMenuCategory: null,
    currentMenuItems: [],
    currentMenuItem: null,
    isEditingMenuItem: false,
    isUpsellingMenuItem: false,
    editingMenuItemForm: null,
    tipPercentage: 0,
    checkoutState: "READY",
    paymentProcessorStatus: "NOT_CONNECTED",
    orderType: null
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
