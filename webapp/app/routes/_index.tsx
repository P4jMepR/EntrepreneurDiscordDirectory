import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
	return [
		{ title: "Furlough Directory" },
		{ name: "description", content: "Welcome to the Furlough Directory." },
	];
};

export const Index = () => {
	return (
		<main className="flex items-center gap-8 py-4 px-8">
			<Button>test</Button>
		</main>
	);
};

export default Index;
