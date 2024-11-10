import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "regenerator-runtime/runtime";

// Import the layouts
import RootLayout from "./layouts/RootLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Import the components
import IndexPage from "./routes";
import SignInPage from "./routes/auth/SignIn";
import SignUpPage from "./routes/auth/SignUp";
import DashboardPage from "./routes/dashboard/Dashboard";
import InterviewInformation from "./routes/dashboard/InterviewInformation";
import InterviewQuestions from "./routes/dashboard/InterviewQuestions";
import Feedback from "./routes/dashboard/Feedback";
import NoRoute from "./routes/NoRoute";

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{ path: "/", element: <IndexPage /> },
			{ path: "/sign-in/*", element: <SignInPage /> },
			{ path: "/sign-up/*", element: <SignUpPage /> },
			{
				element: <DashboardLayout />,
				path: "dashboard",
				children: [
					{ path: "/dashboard", element: <DashboardPage /> },
					{ path: "/dashboard/interview/:mockId", element: <InterviewInformation /> },
					{ path: "/dashboard/interview/:mockId/start/*", element: <InterviewQuestions /> },
					{ path: "/dashboard/interview/:mockId/feedback/*", element: <Feedback /> },
				],
			},
			{ path: "*", element: <NoRoute /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);