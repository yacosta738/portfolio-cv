/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
	// @ts-expect-error
	test: {
		/* for example, use 'happy-dom' to run tests in a browser-like environment */
		environment: "happy-dom",
	},
});
