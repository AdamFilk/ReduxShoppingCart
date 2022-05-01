import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    itemList:[],
    totalQuantity: 0,
    showCart : false,
    changed:false,
}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        replaceData:(state,action)=>{
            state.itemList=action.payload.itemList;
            state.totalQuantity = action.payload.totalQuantity
        },
        addToCart:(state,action)=>{
            state.changed=true;
            const newItem = action.payload;
            const existingItem = state.itemList.find(item=>item.id===newItem.id);
            if(existingItem){
                existingItem.quantity++;
                existingItem.totalPrice+=newItem.price;
            }else{
                state.itemList.push({
                    id : newItem.id,
                    name : newItem.name,
                    price : newItem.price,
                    quantity : 1,
                    totalPrice : newItem.price
                });
                state.totalQuantity++;
            }
        },
        removeFromCart(state,action){
            state.changed=true;
            const item = state.itemList.find(item=>item.id===action.payload);
            if(item.quantity===1){
                state.itemList = state.itemList.filter(item=>item.id!==action.payload);
                state.totalQuantity--;
            }else{
                item.quantity--;
                item.totalPrice-=item.price;
            }
        },
        setShowCart(state,action){
            state.showCart=!state.showCart;
        }
    }
})





export const cartActions=cartSlice.actions;
export default cartSlice;