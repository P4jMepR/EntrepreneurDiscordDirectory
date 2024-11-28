import type { LinksFunction } from "@remix-run/node";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";

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
	// const { darkMode } = useRouteLoaderData<typeof clientLoader>("root");
	// const error = useRouteError();

	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		setIsDarkMode(document.documentElement.classList.contains("dark"));
	}, []);

	const handleDarkModeToggle = (enabled: boolean) => {
		setIsDarkMode(enabled);
		document.documentElement.classList.toggle('dark', enabled);
		localStorage.theme = enabled ? 'dark' : 'light';
	};

	return (
		<html lang="en" className={`${isDarkMode ? "dark" : ""}`}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: dark mode setter to avoid FOUC
					dangerouslySetInnerHTML={{
						__html: `
							document.documentElement.classList.toggle(
								'dark',
								localStorage.theme === 'dark' ||
								(!('theme' in localStorage) && 
								window.matchMedia('(prefers-color-scheme: dark)').matches)
							);
						`,
					}}
				/>
			</head>
			<body>
				<div className="h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors">
					<Header
						isDarkMode={isDarkMode}
						onDarkModeToggle={handleDarkModeToggle}
					/>
					{children}
				</div>
				<ScrollRestoration />
				<Scripts />
				<Analytics />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
