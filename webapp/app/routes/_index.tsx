import type { MetaFunction } from "@remix-run/node";
import { ClientLoaderFunctionArgs } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
	return [
		{ title: "Furlough Directory" },
		{ name: "description", content: "Welcome to the Furlough Directory." },
	];
};

export const Index = () => {
	return (
		<main className="flex flex-col gap-8 py-4 px-8">
			<Button>test</Button>
			<div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />
		</main>
	);
};

export default Index;
