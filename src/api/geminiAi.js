import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCbUCk5QjeHqrEIAPpKRg2XVB0weOmPl90");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export { model };