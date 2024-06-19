import {createSlice,current} from '@reduxjs/toolkit';

const initialState = {
    items:[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
    resName:''
}


const cartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        addIntoCart:(state,action)=>{
            const itemIndex = state.items.findIndex(findItem=>{
                return findItem?.card?.info?.id === action.payload.item?.card?.info?.id
            })

            if(itemIndex>=0){
                state.items[itemIndex].cartQuantity += 1;
                state.cartTotalQuantity+=1;
                state.items[itemIndex].card.info.price=state.items[itemIndex].cartQuantity*state.items[itemIndex].exactPrice;
                state.cartTotalAmount=state.cartTotalAmount+(state.items[itemIndex].exactPrice/100)

            }
            else{
                const tempItem = {...action.payload.item,cartQuantity:1,exactPrice:action?.payload?.price || action?.payload?.defaultPrice,buttonId:action.payload.id}
                state.items.push(tempItem);
                state.cartTotalQuantity+=1;
                state.cartTotalAmount=state.cartTotalAmount+action?.payload?.price/100 || state.cartTotalAmount+action?.payload?.defaultPrice/100
                state.resName=action.payload.resName;
            }
        },
        removeFromCart:(state,action)=>{
            const itemIndex = state.items.findIndex(findItem=>{
                return findItem.card.info.id === action.payload.card.info.id
            })

            if(itemIndex>=0){

                if(state.items[itemIndex]?.cartQuantity<=1){
                    // state.cartTotalQuantity-=1
                    const filterItems = state.items.filter(item=>{
                        return item.card.info.id !== action.payload.card.info.id
                    })
                    return {...state,items:filterItems,cartTotalQuantity:state.cartTotalQuantity-1,cartTotalAmount:state.cartTotalAmount-(state.items[itemIndex].exactPrice/100)}
                }
                else{
                    state.items[itemIndex].cartQuantity-=1;
                    state.cartTotalQuantity-=1;
                    state.items[itemIndex].card.info.price=state.items[itemIndex].card.info.price-state.items[itemIndex].exactPrice;
                    state.cartTotalAmount=state.cartTotalAmount-(state.items[itemIndex].exactPrice/100);
                }
                
            }

        },
        clearCart:(state)=>{
            state.items.length=0;
            state.cartTotalAmount=0;
            state.cartTotalQuantity=0;
            state.resName=''
        }
    }
})

export const {addIntoCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

