import {
	BASE_URL_LOCAL,
	BASE_URL_PROD,
	BRAND_NAME,
	NOT_TRANSLATED_CAUTION_EN,
	NOT_TRANSLATED_CAUTION_ES,
	SITE_DESCRIPTION_EN,
	SITE_DESCRIPTION_ES,
	SITE_TITLE,
	X_ACCOUNT,
} from "astro:env/client";
import type { Multilingual } from "@/i18n";

export const BRAND_NAME: string | Multilingual =
	BRAND_NAME || "Yuniel Acosta - Full Stack Developer";
export const SITE_TITLE: string | Multilingual =
	SITE_TITLE || "Yuniel Acosta - Full Stack Developer";

export const SITE_DESCRIPTION: string | Multilingual = {
	en:
		SITE_DESCRIPTION_EN ||
		"Portfolio of Yuniel Acosta, Full Stack Developer",
	es:
		SITE_DESCRIPTION_ES ||
		"Portafolio de Yuniel Acosta, Desarrollador Full Stack",
};

export const X_ACCOUNT: string | Multilingual =
	X_ACCOUNT || "@yacosta738";

export const NOT_TRANSLATED_CAUTION: string | Multilingual = {
	en:
		NOT_TRANSLATED_CAUTION_EN ||
		"This page is not available in your language.",
	es:
		NOT_TRANSLATED_CAUTION_ES ||
		"Esta página no está disponible en tu idioma.",
};

// Base URLs
const BASE_URL_LOCAL = BASE_URL_LOCAL || "http://localhost:4321";
const BASE_URL_PROD = BASE_URL_PROD || "https://your-production-url.com";
export const BASE_URL = import.meta.env.DEV ? BASE_URL_LOCAL : BASE_URL_PROD;
