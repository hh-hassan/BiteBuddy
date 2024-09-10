import { createSlice, current } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    
    name: 'cart',

    initialState: {
        items: []
    },

    reducers: {
        
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        
        removeItem: (state, action) => {
            const index = state.items.findIndex(item => item.card.info.id === action.payload.card.info.id);
            state.items.splice(index, 1);
            // console.log(current(state.items[0]));
        },
        
        clearCart: (state) => {
            state.items.length = 0;

            /* or

            return { items: [] };

            i.e either mutate the original state or return a new state
                the returned state will replace the original state */ 
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;