import {createAsyncThunk} from "@reduxjs/toolkit"
import axiosInstance from "../../interceptors/interceptors";

const productData = createAsyncThunk('productsList/productData',async()=>{
    // const state = thunkAPI.getState();
    // console.log("state",state)
    const response = await axiosInstance.get("/getproducts");
    // console.log("thunk",response.data.data);
    return response.data.products;
})
export default productData;