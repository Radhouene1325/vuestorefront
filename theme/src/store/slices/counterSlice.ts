// store/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    value: boolean; // TypeScript typically uses lowercase number
}

const initialState: CounterState = {
    value: false,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        openWichList: (state,action:PayloadAction) => {
            console.log(action.payload)
            state.value=action.payload;
        },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
});

export const { openWichList, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
