import { createStore, applyMiddleware, compose } from "redux"
import root from "./reducers"
import thunk from "redux-thunk"

const composeA = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(root, composeA(applyMiddleware(thunk)))
export default store;