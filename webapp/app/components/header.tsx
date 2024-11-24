import { Moon, Sun } from "lucide-react";
import * as React from "react";
import { IconSwitch } from "~/components/ui/iconSwitch";

interface HeaderProps {
	isDarkMode: boolean;
	onDarkModeToggle: (enabled: boolean) => void;
}

export const Header = ({ isDarkMode, onDarkModeToggle }: HeaderProps) => {
	const handleDarkModeToggle = () => {
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
				<div className="flex items-center gap-2">
					<IconSwitch
						checked={isDarkMode}
						onCheckedChange={handleDarkModeToggle}
					>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					</IconSwitch>
				</div>
			</header>
		</div>
	);
};
