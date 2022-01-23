import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client'

const httpLink = createHttpLink({
    uri: '/query',
})

export const client = new ApolloClient({
    link: from([
        httpLink,
    ]),
    cache: new InMemoryCache(),
    credentials: 'same-origin',
})

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
