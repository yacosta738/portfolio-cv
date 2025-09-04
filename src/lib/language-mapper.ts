import { getCollection } from "astro:content";
import type { Lang } from "@/i18n";

export interface LanguageEntry {
	code: string;
	nativeName: string;
	names: Record<string, string>;
	flag?: string;
	direction: "ltr" | "rtl";
}

/**
 * Language mapping service for resolving language names to locale codes
 */
export class LanguageMapper {
	private languagesMap: Map<string, LanguageEntry> = new Map();
	private nameToCodeMap: Map<string, string> = new Map();
	private initialized = false;

	/**
	 * Initialize the language mapper with data from the languages collection
	 */
	async initialize(): Promise<void> {
		if (this.initialized) return;

		try {
			const languageEntries = await getCollection("languagesLibrary");

			for (const entry of languageEntries) {
				const lang: LanguageEntry = {
					code: entry.data.code,
					nativeName: entry.data.nativeName,
					names: entry.data.names,
					flag: entry.data.flag,
					direction: entry.data.direction,
				};

				this.languagesMap.set(lang.code, lang);

				// Build reverse mapping: language name -> locale code
				// Map all variations of the language name
				Object.values(lang.names).forEach((name) => {
					this.nameToCodeMap.set(name.toLowerCase(), lang.code);
				});

				// Also map the native name
				this.nameToCodeMap.set(lang.nativeName.toLowerCase(), lang.code);
			}

			this.initialized = true;
		} catch (error) {
			console.error("Failed to initialize LanguageMapper:", error);
		}
	}

	/**
	 * Find the locale code for a given language name
	 * @param languageName - The language name to look up (e.g., "English", "Inglés", "Español")
	 * @returns The locale code (e.g., "en", "es") or undefined if not found
	 */
	findLocaleCode(languageName?: string): string | undefined {
		if (!languageName || !this.initialized) return undefined;

		const normalizedName = languageName.toLowerCase().trim();
		return this.nameToCodeMap.get(normalizedName);
	}

	/**
	 * Get all supported languages
	 */
	getAllLanguages(): LanguageEntry[] {
		return Array.from(this.languagesMap.values());
	}

	/**
	 * Get language entry by code
	 */
	getLanguage(code: string): LanguageEntry | undefined {
		return this.languagesMap.get(code);
	}

	/**
	 * Get the display name of a language in a specific locale
	 * @param languageCode - The code of the language to get the name for
	 * @param displayLocale - The locale to display the name in
	 */
	getDisplayName(
		languageCode: string,
		displayLocale: Lang,
	): string | undefined {
		const language = this.languagesMap.get(languageCode);
		return language?.names[displayLocale] || language?.nativeName;
	}
}

// Global singleton instance
export const languageMapper = new LanguageMapper();
