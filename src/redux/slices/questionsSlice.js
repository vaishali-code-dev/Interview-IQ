import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	questions: [],
};

export const questionsSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {
		addQuestions: (state, action) => {
			state.questions = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;