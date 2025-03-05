import {configureStore} from "@reduxjs/toolkit";
import {productReducer} from "./reducer/productSlicer";
const store = configureStore({
    reducer: productReducer
})
export default store ;