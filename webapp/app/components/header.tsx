import { Switch } from "~/components/ui/switch";

interface HeaderProps {
	isDarkMode: boolean;
	onDarkModeToggle: (enabled: boolean) => void;
}

export const Header = ({ isDarkMode, onDarkModeToggle }: HeaderProps) => {
	const handleDarkModeToggle = () => {
		console.log({ isDarkMode });
		onDarkModeToggle(!isDarkMode);
	};

	return (
		<div className="flex items-center">
			<header className="sticky top-0 w-full flex items-center justify-between gap-16 py-4 px-8 text-gray-900 dark:text-gray-100">
				<div className="flex items-center gap-8">
					<h1 className="leading text-5xl font-semibold ">
						<span className="text-blue-500">F</span>
						<span className="text-indigo-700">D</span>
					</h1>
					<span className="leading text-2xl font-extrabold ">
						Furlough Directory
					</span>
				</div>
				<div className="flex items-center gap-8">
					<Switch checked={isDarkMode} onCheckedChange={handleDarkModeToggle} />
				</div>
			</header>
		</div>
	);
};
