import type { Multilingual } from "@/i18n";

export const BRAND_NAME: string | Multilingual =
	import.meta.env.BRAND_NAME || "Yuniel Acosta - Full Stack Developer";
export const SITE_TITLE: string | Multilingual =
	import.meta.env.SITE_TITLE || "Yuniel Acosta - Full Stack Developer";

export const SITE_DESCRIPTION: string | Multilingual = {
	en:
		import.meta.env.SITE_DESCRIPTION_EN ||
		"Portfolio of Yuniel Acosta, Full Stack Developer",
	es: "Portafolio de Yuniel Acosta, Desarrollador Full Stack",
};

export const X_ACCOUNT: string | Multilingual =
	import.meta.env.X_ACCOUNT || "@yacosta738";

export const NOT_TRANSLATED_CAUTION: string | Multilingual = {
	en:
		import.meta.env.NOT_TRANSLATED_CAUTION_EN ||
		"This page is not available in your language.",
	es:
		import.meta.env.NOT_TRANSLATED_CAUTION_ES ||
		"Esta página no está disponible en tu idioma.",
};

// Base URLs
const BASE_URL_LOCAL =
	import.meta.env.BASE_URL_LOCAL || "http://localhost:4321";
const BASE_URL_PROD =
	import.meta.env.BASE_URL_PROD || "https://your-production-url.com";
export const BASE_URL = import.meta.env.DEV ? BASE_URL_LOCAL : BASE_URL_PROD;
