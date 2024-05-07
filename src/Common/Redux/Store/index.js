import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import listReducer from "../Reducers/ListReducer";

const rootReducer = {
    listReducer
}

const reducer = combineReducers(rootReducer)


const Store = () => {
    const applicationStore = createStore(
        reducer,
        Window.__PRELOADED_STATE__,
        compose(applyMiddleware(thunk))
    )
    return applicationStore
}

export default Store

