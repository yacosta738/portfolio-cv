import type { Multilingual } from "@/i18n";

export const BRAND_NAME: string | Multilingual =
	"Yuniel Acosta - Full Stack Developer";
export const SITE_TITLE: string | Multilingual =
	"Yuniel Acosta - Full Stack Developer";

export const SITE_DESCRIPTION: string | Multilingual = {
	es: "Portafolio de Yuniel Acosta, Desarrollador Full Stack",
	en: "Portfolio of Yuniel Acosta, Full Stack Developer",
};

export const X_ACCOUNT: string | Multilingual = "@yacosta738";

export const NOT_TRANSLATED_CAUTION: string | Multilingual = {
	en: "This page is not available in your language.",
	es: "Esta página no está disponible en tu idioma.",
};

// Base URLs
const BASE_URL_LOCAL = "http://localhost:4321";
const BASE_URL_PROD = "https://your-production-url.com";
export const BASE_URL = import.meta.env.DEV ? BASE_URL_LOCAL : BASE_URL_PROD;
