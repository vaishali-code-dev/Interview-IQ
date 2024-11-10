import { SignIn } from "@clerk/clerk-react";
import AuthLayout from "./AuthLayout";

export default function SignInPage() {
	return (
		<AuthLayout>
			<SignIn path="/sign-in" />
		</AuthLayout>
	);
}