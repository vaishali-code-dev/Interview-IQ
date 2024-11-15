import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import Logo from "@/utils/assets/Logo";

const HEADER_ROUTES = [
	{
		name: "Dashboard",
		path: "/dashboard",
	},
	{
		name: "Questions",
		path: "/Questions",
	},
	{
		name: "How it works?",
		path: "/how-it-works",
	},
];

const Header = () => {
	const location = useLocation();

	return (
		<header className="bg-secondary text-center p-3 grid grid-cols-3 items-center">
			<div className="text-3xl font-semibold grid-cols-1 justify-self-start">
				<Link to="/">
					<Button variant="ghost" className="text-lg font-semibold ">
						<Logo isLight={false} />
						<span>Interview IQ</span>
					</Button>
				</Link>
			</div>

			<div className="grid-cols-1 justify-self-center invisible md:visible">
				<ul className="flex gap-6 font-medium">
					{HEADER_ROUTES.map((route) => (
						<li
							role="button"
							className={classNames("cursor-pointer", {
								"text-primary": location.pathname.includes(route.path),
							})}
							key={route.name}
						>
							<Link to={route.path}>{route.name}</Link>
						</li>
					))}
				</ul>
			</div>

			<div className="grid-cols-1 justify-self-end">
				<SignedIn>
					<UserButton />
				</SignedIn>
				<SignedOut>
					<Link to="/sign-in">
						<Button>Sign In</Button>
					</Link>
				</SignedOut>
			</div>
		</header>
	);
};

export default Header;