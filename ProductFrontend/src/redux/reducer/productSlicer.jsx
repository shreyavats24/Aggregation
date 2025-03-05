import { createSlice } from "@reduxjs/toolkit";
import productData from "../actions/fetchData.jsx";
// import { act } from "react";
const productSlicer = createSlice({
    name:"productsList",
    initialState: {
        products:[],
        error:null,
        // edit:{id:null,name:"",Age:0,Department:""},
        // isOpen:false
    },
    reducers:{
        setUpdatedProducts: (state,action)=>{
            state.products = action.payload;
        },
        // setEditUser :(state,action)=>{
        //     state.edit = action.payload;
        // },
        // setIsOpen : (state,action)=>{
        //     state.isOpen = action.payload;
        // }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(productData.pending,(state)=>{
            // state.loading= true;
        })

        .addCase(productData.fulfilled,(state,action)=>{
            state.products = action.payload; 
        })

        .addCase(productData.rejected,(state,action)=>{
            state.error = action.error.message;
        })
    },
})

export const {setUpdatedProducts} = productSlicer.actions;
export const productReducer = productSlicer.reducer