export type SocialIcon = Record<string, string | unknown>;

// Theme system types
export type Theme = "light" | "dark";

export interface ThemeSystem {
	toggle: () => void;
	set: (theme: Theme) => void;
	get: () => Theme;
	getStored: () => Theme | null;
	getSystem: () => Theme;
}

// Global theme system API
declare global {
	interface Window {
		themeSystem?: ThemeSystem;
	}

	interface HTMLElementEventMap {
		themechange: CustomEvent<{ theme: Theme; timestamp: number }>;
	}
}
