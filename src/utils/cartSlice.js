import { createSlice, current } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    
    name: 'cart',

    initialState: {
        resId: null,
        items: [],
    },

    reducers: {
        
        addResId: (state, action) => {
            state.resId = action.payload;
        },
        
        addItem: (state, action) => {
            
            const existingItem = state.items.find(item => item.card.info.id === action.payload.card.info.id);

            if (existingItem) existingItem.count += 1;

            else
                state.items.push({
                    ...action.payload,
                    count: 1
                });
        },
        
        removeItem: (state, action) => {
            
            const existingItem = state.items.find(item => item.card.info.id === action.payload.card.info.id);

            existingItem.count -= 1;

            if(existingItem.count === 0)
            {
                const index = state.items.findIndex(item => item.card.info.id === action.payload.card.info.id);
                state.items.splice(index, 1);
            }

            if( state.items.length === 0) state.resId = null;
        },
        
        clearCart: (state, action) => {
            state.resId = action.payload;
            state.items.length = 0;

            /* or

            return { items: [] };

            i.e either mutate the original state or return a new state
                the returned state will replace the original state */ 
        },
    },
});

export const { addResId, addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;