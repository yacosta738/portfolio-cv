import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";
import { DEFAULT_LOCALE_SETTING, LOCALES_SETTING } from "./src/i18n/locales";
import { BASE_URL } from "./src/site.consts.ts";

// https://astro.build/config
export default defineConfig({
	site: BASE_URL,
	compressHTML: true,
	env: {
		schema: {
			AHREFS_KEY: envField.string({
				context: "client",
				access: "public",
				default: "",
			}),
			BRAND_NAME: envField.string({
				context: "client",
				access: "public",
				default: "Yuniel Acosta - Full Stack Developer",
			}),
			SITE_TITLE: envField.string({
				context: "client",
				access: "public",
				default: "Yuniel Acosta - Full Stack Developer",
			}),
			SITE_DESCRIPTION_EN: envField.string({
				context: "client",
				access: "public",
				default: "Portfolio of Yuniel Acosta, Full Stack Developer",
			}),
			SITE_DESCRIPTION_ES: envField.string({
				context: "client",
				access: "public",
				default: "Portafolio de Yuniel Acosta, Desarrollador Full Stack",
			}),
			X_ACCOUNT: envField.string({
				context: "client",
				access: "public",
				default: "@yacosta738",
			}),
			NOT_TRANSLATED_CAUTION_EN: envField.string({
				context: "client",
				access: "public",
				default: "This page is not available in your language.",
			}),
			NOT_TRANSLATED_CAUTION_ES: envField.string({
				context: "client",
				access: "public",
				default: "Esta página no está disponible en tu idioma.",
			}),
			BASE_URL_LOCAL: envField.string({
				context: "client",
				access: "public",
				default: "http://localhost:4321",
			}),
			BASE_URL_PROD: envField.string({
				context: "client",
				access: "public",
				default: "https://your-production-url.com",
			}),
		},
		validateSecrets: false,
	},

	i18n: {
		defaultLocale: DEFAULT_LOCALE_SETTING,
		locales: Object.keys(LOCALES_SETTING),
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},

	integrations: [
		icon(),
		sitemap({
			filter: (page) => page !== `${BASE_URL}/admin/`,
			i18n: {
				defaultLocale: DEFAULT_LOCALE_SETTING,
				locales: Object.fromEntries(
					Object.entries(LOCALES_SETTING).map(([key, value]) => [
						key,
						value.lang ?? key,
					]),
				),
			},
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
