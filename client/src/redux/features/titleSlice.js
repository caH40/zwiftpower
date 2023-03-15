import { createSlice } from '@reduxjs/toolkit';

const titleSlice = createSlice({
	name: 'titlePage',
	initialState: {
		value: { title: '' },
	},
	reducers: {
		setTitlePage: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setTitlePage } = titleSlice.actions;

export default titleSlice.reducer;
