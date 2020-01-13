import React from "react";
import { createAuthLink, AUTH_TYPE } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import AppSyncConfig from "./aws-exports";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

import Main from "./pages/Main";

const THEME = createMuiTheme({
  palette: {
    primary: { light: blueGrey[50], main: blueGrey[400], dark: blueGrey[700] },
    contrastThreshold: 3
  },
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

const url = AppSyncConfig.graphqlEndpoint;
const region = AppSyncConfig.region;
const auth = {
  type: AUTH_TYPE.API_KEY,
  apiKey: AppSyncConfig.apiKey
};

const httpLink = createHttpLink({ uri: url });
const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink(url, httpLink)
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const WithGQLProvider = () => (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={THEME}>
      <Main />
    </MuiThemeProvider>
  </ApolloProvider>
);

export default WithGQLProvider;
