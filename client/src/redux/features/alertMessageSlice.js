import { createSlice } from '@reduxjs/toolkit';

const alertMessageSlice = createSlice({
	name: 'alertMessageSlice',
	initialState: {
		value: { message: 'start', type: 'success', isOpened: false },
		//error,warning,info,success
	},
	reducers: {
		getAlert: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { getAlert } = alertMessageSlice.actions;

export default alertMessageSlice.reducer;
