import { configureStore } from "@reduxjs/toolkit";
import questionsSlice from "./slices/questionsSlice";

export const store = configureStore({
	reducer: {
		questions: questionsSlice,
	},
});