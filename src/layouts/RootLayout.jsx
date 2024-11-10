import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
	const navigate = useNavigate();

	return (
		<Provider store={store}>
			<ClerkProvider
				routerPush={(to) => navigate(to)}
				routerReplace={(to) => navigate(to, { replace: true })}
				publishableKey={PUBLISHABLE_KEY}
			>
				<Header />
				<main className="">
					<Outlet />
				</main>
			</ClerkProvider>
		</Provider>
	);
}