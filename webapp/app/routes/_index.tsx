import type { MetaFunction } from "@remix-run/node";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";

import image_1_andmerge from "~/assets/images/screens/1_andmerge.png";
import image_2_quantumhire from "~/assets/images/screens/2_quantumhire.png";
import image_2_zynex from "~/assets/images/screens/2_zynex.png";
import image_3_getitright from "~/assets/images/screens/3_getitright.png";
import image_4_goodwatch from "~/assets/images/screens/4_goodwatch.png";

export const meta: MetaFunction = () => {
	return [
		{ title: "Furlough Directory" },
		{ name: "description", content: "Welcome to the Furlough Directory." },
	];
};

const mockData = [
	{
		id: 1,
		displayName: "Kirilo | CEO and Product Design",
		username: "kirillspraev",
		avatar: "",
		bio: "https://andmerge.com/",
		links: [
			{
				url: "https://andmerge.com/",
				img: image_1_andmerge,
			},
		],
		updatedAt: "today",
	},
	{
		id: 2,
		displayName: "P4jMepR | Tech Entrepreneur",
		username: "p4jmepr",
		avatar: "",
		bio:
			"Building 2 SaaS products:\n" +
			"Automation for HR and Recruitment:\n" +
			"https://quantumhire.io/ \n" +
			"\n" +
			"Marketing for solo-preneurs \n" +
			"(and indie devs):\n" +
			"https://zynex.io/",
		links: [
			{
				url: "https://quantumhire.io/",
				img: image_2_quantumhire,
			},
			{
				url: "https://zynex.io/",
				img: image_2_zynex,
			},
		],
		updatedAt: "today",
	},
	{
		id: 3,
		displayName: "Mohit | UX Audit",
		username: "tatermohit",
		avatar: "",
		bio:
			"Get your Product/Website UX right \n" +
			"https://getitright.design/\n" +
			"\n" +
			"LinkedIn\n" +
			"https://www.linkedin.com/in/tatermohit/",
		links: [
			{
				url: "https://getitright.design",
				img: image_3_getitright,
			},
			{
				url: "https://www.linkedin.com/in/tatermohit/",
				img: null,
			},
		],
		updatedAt: "today",
	},
	{
		id: 4,
		displayName: "Alper | Web Engineer",
		username: "alp82",
		avatar: "",
		bio:
			"Creator of https://goodwatch.app/\n" +
			"\n" +
			"https://discord.gg/TVAcrfQzcA\n" +
			"Happy to welcome you on the Discord",
		links: [
			{
				url: "https://goodwatch.app/",
				img: image_4_goodwatch,
			},
			{
				url: "https://discord.gg/TVAcrfQzcA",
				img: null,
			},
		],
		updatedAt: "today",
	},
	{
		id: 5,
		displayName: "OG DAN | eCommerce PPC",
		username: ".ogdan",
		avatar: "",
		bio: "$197M in ad attributed sales since Nov ‘19",
		links: [],
		updatedAt: "today",
	},
	{
		id: 6,
		displayName: "jimmy",
		username: "astickyghost",
		avatar: "",
		bio:
			"Trying to find my way err day in the online world\n" +
			"\n" +
			"Musician into poetry, & proud Dad of 2 psycho Frenchies\n" +
			"📌: Houston, TX #713\n",
		links: [],
		updatedAt: "today",
	},
];

export const Index = () => {
	return (
		<main className="flex flex-col gap-8 py-4 px-8">
			{/*<Button>test</Button>*/}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
				{mockData.map((item) => (
					<Card key={item.id} className="flex flex-col">
						<CardHeader>
							<CardTitle>{item.displayName}</CardTitle>
							<CardDescription>
								{item.links?.[0]?.url && (
									<a
										className="text-blue-600 dark:text-blue-400 cursor-pointer"
										href={item.links[0].url}
										target="_blank"
										rel="noreferrer"
									>
										{item.links[0].url}
									</a>
								)}
							</CardDescription>
						</CardHeader>
						<CardContent className="flex-1">
							{item.links?.[0]?.img ? (
								<a
									className="cursor-pointer"
									href={item.links[0].url}
									target="_blank"
									rel="noreferrer"
								>
									<img
										className="border-4 rounded-xl"
										src={item.links[0].img}
										alt=""
									/>
								</a>
							) : (
								<p className="leading">{item.bio}</p>
							)}
						</CardContent>
						<CardFooter className="self-end">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Last updated: <strong>{item.updatedAt}</strong>
							</p>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
};

export default Index;
