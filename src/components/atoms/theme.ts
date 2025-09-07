/**
 * Enhanced theme management system
 * Handles dark/light mode with better error handling, performance, and accessibility
 */
(() => {
	// Theme constants
	const LIGHT_COLOR = "#ffffff";
	const DARK_COLOR = "#0b1016";
	const STORAGE_KEY = "theme";
	const THEME_CLASS = "dark";

	// Valid theme values
	type Theme = "light" | "dark";

	// Global theme API interface
	interface ThemeSystem {
		toggle: () => void;
		set: (theme: Theme) => void;
		get: () => Theme;
		getStored: () => Theme | null;
		getSystem: () => Theme;
	}

	// Cache DOM references for better performance
	let themeColorMeta: HTMLMetaElement | null = null;
	let prefersDarkMediaQuery: MediaQueryList | null = null;

	/**
	 * Initialize theme color meta tag
	 */
	function initThemeColorMeta(): HTMLMetaElement {
		if (themeColorMeta) return themeColorMeta;

		themeColorMeta = document.querySelector('meta[name="theme-color"]');

		if (!themeColorMeta) {
			themeColorMeta = document.createElement("meta");
			themeColorMeta.name = "theme-color";
			themeColorMeta.id = "theme-color";
			document.head.appendChild(themeColorMeta);
		}

		return themeColorMeta;
	}

	/**
	 * Initialize media query for system theme preference
	 */
	function initMediaQuery(): MediaQueryList | null {
		if (prefersDarkMediaQuery !== null) return prefersDarkMediaQuery;

		try {
			prefersDarkMediaQuery =
				window.matchMedia?.("(prefers-color-scheme: dark)") ?? null;
		} catch (error) {
			console.warn("Theme system: Failed to initialize media query:", error);
			prefersDarkMediaQuery = null;
		}

		return prefersDarkMediaQuery;
	}

	/**
	 * Safely get stored theme from localStorage
	 */
	function getStoredTheme(): Theme | null {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored === "dark" || stored === "light" ? stored : null;
		} catch (error) {
			console.warn("Theme system: Failed to access localStorage:", error);
			return null;
		}
	}

	/**
	 * Get system preferred theme
	 */
	function getSystemTheme(): Theme {
		const mediaQuery = initMediaQuery();
		return mediaQuery?.matches ? "dark" : "light";
	}

	/**
	 * Get current effective theme
	 */
	function getCurrentTheme(): Theme {
		return document.documentElement.classList.contains(THEME_CLASS)
			? "dark"
			: "light";
	}

	/**
	 * Apply theme with optimized DOM updates
	 */
	function applyTheme(theme: Theme): void {
		const html = document.documentElement;
		const meta = initThemeColorMeta();

		// Batch DOM updates to avoid layout thrashing
		requestAnimationFrame(() => {
			const isDark = theme === "dark";

			// Update HTML class
			html.classList.toggle(THEME_CLASS, isDark);

			// Update meta theme color
			meta.setAttribute("content", isDark ? DARK_COLOR : LIGHT_COLOR);

			// Dispatch custom event for other components to listen
			html.dispatchEvent(
				new CustomEvent("themechange", {
					detail: { theme, timestamp: Date.now() },
				}),
			);
		});
	}

	/**
	 * Store theme preference safely
	 */
	function storeTheme(theme: Theme): void {
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch (error) {
			console.warn("Theme system: Failed to store theme preference:", error);
		}
	}

	/**
	 * Toggle theme programmatically
	 */
	function toggleTheme(): void {
		const currentTheme = getCurrentTheme();
		const newTheme: Theme = currentTheme === "dark" ? "light" : "dark";

		applyTheme(newTheme);
		storeTheme(newTheme);
	}

	/**
	 * Initialize theme system
	 */
	function initTheme(): void {
		// Determine initial theme
		const storedTheme = getStoredTheme();
		const initialTheme = storedTheme ?? getSystemTheme();

		// Apply initial theme
		applyTheme(initialTheme);

		// Store preference if not already stored
		if (!storedTheme) {
			storeTheme(initialTheme);
		}
	}

	/**
	 * Setup system theme change listener
	 */
	function setupSystemThemeListener(): void {
		const mediaQuery = initMediaQuery();

		if (!mediaQuery || typeof mediaQuery.addEventListener !== "function") {
			return;
		}

		mediaQuery.addEventListener("change", (event) => {
			// Only respond to system changes if user hasn't set a preference
			const storedTheme = getStoredTheme();
			if (!storedTheme) {
				const systemTheme = event.matches ? "dark" : "light";
				applyTheme(systemTheme);
				storeTheme(systemTheme);
			}
		});
	}

	/**
	 * Setup cross-tab theme synchronization
	 */
	function setupStorageListener(): void {
		window.addEventListener("storage", (event) => {
			if (event.key === STORAGE_KEY && event.newValue) {
				const newTheme = event.newValue as Theme;
				if (newTheme === "dark" || newTheme === "light") {
					applyTheme(newTheme);
				}
			}
		});
	}

	/**
	 * Expose theme API to global scope for programmatic access
	 */
	function exposeThemeAPI(): void {
		if (typeof window !== "undefined") {
			(window as typeof window & { themeSystem: ThemeSystem }).themeSystem = {
				toggle: toggleTheme,
				set: (theme: Theme) => {
					applyTheme(theme);
					storeTheme(theme);
				},
				get: getCurrentTheme,
				getStored: getStoredTheme,
				getSystem: getSystemTheme,
			};
		}
	}

	// Initialize theme system when DOM is ready
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => {
			initTheme();
			setupSystemThemeListener();
			setupStorageListener();
			exposeThemeAPI();
		});
	} else {
		// DOM already loaded
		initTheme();
		setupSystemThemeListener();
		setupStorageListener();
		exposeThemeAPI();
	}
})();
