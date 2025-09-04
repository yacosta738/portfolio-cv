import {
	BASE_URL_LOCAL as ENV_BASE_URL_LOCAL,
	BASE_URL_PROD as ENV_BASE_URL_PROD,
	BRAND_NAME as ENV_BRAND_NAME,
	NOT_TRANSLATED_CAUTION_EN as ENV_NOT_TRANSLATED_CAUTION_EN,
	NOT_TRANSLATED_CAUTION_ES as ENV_NOT_TRANSLATED_CAUTION_ES,
	SITE_DESCRIPTION_EN as ENV_SITE_DESCRIPTION_EN,
	SITE_TITLE as ENV_SITE_TITLE,
	X_ACCOUNT as ENV_X_ACCOUNT,
} from "astro:env/client";
import type { Multilingual } from "@/i18n";

export const BRAND_NAME: string | Multilingual =
	ENV_BRAND_NAME || "Yuniel Acosta - Full Stack Developer";
export const SITE_TITLE: string | Multilingual =
	ENV_SITE_TITLE || "Yuniel Acosta - Full Stack Developer";

export const SITE_DESCRIPTION: string | Multilingual = {
	en:
		ENV_SITE_DESCRIPTION_EN ||
		"Portfolio of Yuniel Acosta, Full Stack Developer",
	es: "Portafolio de Yuniel Acosta, Desarrollador Full Stack",
};

export const X_ACCOUNT: string | Multilingual = ENV_X_ACCOUNT || "@yacosta738";

export const NOT_TRANSLATED_CAUTION: string | Multilingual = {
	en:
		ENV_NOT_TRANSLATED_CAUTION_EN ||
		"This page is not available in your language.",
	es:
		ENV_NOT_TRANSLATED_CAUTION_ES ||
		"Esta página no está disponible en tu idioma.",
};

// Base URLs
const BASE_URL_LOCAL = ENV_BASE_URL_LOCAL || "http://localhost:4321";
const BASE_URL_PROD = ENV_BASE_URL_PROD || "https://your-production-url.com";
export const BASE_URL = import.meta.env.DEV ? BASE_URL_LOCAL : BASE_URL_PROD;
