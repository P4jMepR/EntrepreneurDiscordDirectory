import type { LinksFunction } from "@remix-run/node";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";
import { useEffect, useState } from "react";
import { Header } from "~/components/header";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const localSetting = localStorage.theme === "dark";
		const systemSetting =
			!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		setIsDarkMode(localSetting || systemSetting);
	});

	const handleDarkModeToggle = (enabled: boolean) => {
		console.log({ enabled });
		setIsDarkMode(enabled);
		localStorage.theme = isDarkMode ? "light" : "dark";
	};

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className={`${isDarkMode ? "dark" : ""}`}>
				<div className="h-screen bg-zinc-50 dark:bg-zinc-900">
					<Header
						isDarkMode={isDarkMode}
						onDarkModeToggle={handleDarkModeToggle}
					/>
					{children}
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
