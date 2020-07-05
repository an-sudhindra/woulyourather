import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware, compose } from "redux"
import { loadingBarMiddleware } from "react-redux-loading"
import { Provider } from "react-redux"
import reducer from "./reducers"
import thunk from "redux-thunk"
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './utils/theme';
import './css/custom.css'
import App from './App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, loadingBarMiddleware()))
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);