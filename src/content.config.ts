import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Reusable schemas
const profileSchema = z.object({
	network: z.string(),
	username: z.string(),
	url: z.string().url(),
});

const locationSchema = z.object({
	address: z.string().optional(),
	postalCode: z.string().optional(),
	city: z.string(),
	countryCode: z.string(),
	region: z.string(),
});

// System skills library collection (icons, metadata, etc.)
const skillsLibrary = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/skills" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		icon: z.string().optional(),
	}),
});

// Languages library collection (language names, mappings, metadata)
const languagesLibrary = defineCollection({
	loader: glob({ pattern: "**/[^_]*.json", base: "./src/data/languages" }),
	schema: z.object({
		code: z.string(),
		nativeName: z.string(),
		names: z.record(z.string(), z.string()), // { "en": "English", "es": "Inglés" }
		flag: z.string().optional(),
		direction: z.enum(["ltr", "rtl"]).default("ltr"),
	}),
});

// Main resume collection using glob loader for multiple languages
const resume = defineCollection({
	loader: glob({ pattern: "**/resume.json", base: "./src/data/resume" }),
	schema: z.object({
		basics: z.object({
			name: z.string(),
			label: z.string(),
			image: z.string(),
			email: z.string().email(),
			phone: z.string().optional(),
			url: z.string().url().optional(),
			summary: z.string(),
			location: locationSchema,
			profiles: z.array(profileSchema),
		}),
		// Direct JSON arrays instead of references for now
		work: z.array(
			z.object({
				name: z.string(),
				position: z.string(),
				url: z.string().url().optional(),
				startDate: z.string().transform((str) => new Date(str)),
				endDate: z
					.string()
					.nullable()
					.transform((str) => str ? new Date(str) : null),
				summary: z.string().optional(),
				highlights: z.array(z.string()).optional(),
			}),
		),
		volunteer: z
			.array(
				z.object({
					organization: z.string(),
					position: z.string(),
					url: z.string().url().optional(),
					startDate: z.string().transform((str) => new Date(str)),
					endDate: z
						.string()
						.nullable()
						.optional()
						.transform((str) => str ? new Date(str) : null),
					summary: z.string().optional(),
					highlights: z.array(z.string()).optional(),
				}),
			)
			.optional(),
		education: z.array(
			z.object({
				institution: z.string(),
				url: z.string().url().optional(),
				area: z.string(),
				studyType: z.string(),
				startDate: z.string().transform((str) => new Date(str)),
				endDate: z
					.string()
					.nullable()
					.optional()
					.transform((str) => str ? new Date(str) : null),
				score: z.string().optional(),
				courses: z.array(z.string()).optional(),
			}),
		),
		awards: z
			.array(
				z.object({
					title: z.string(),
					date: z.string().transform((str) => new Date(str)),
					awarder: z.string(),
					summary: z.string().optional(),
				}),
			)
			.optional(),
		certificates: z
			.array(
				z.object({
					name: z.string(),
					date: z.string().transform((str) => new Date(str)),
					issuer: z.string(),
					url: z.string().url().optional(),
				}),
			)
			.optional(),
		publications: z
			.array(
				z.object({
					name: z.string(),
					publisher: z.string(),
					releaseDate: z.string().transform((str) => new Date(str)),
					url: z.string().url().optional(),
					summary: z.string().optional(),
				}),
			)
			.optional(),
		skills: z.array(
			z.object({
				name: z.string(),
				level: z.string().optional(),
				keywords: z.array(z.string()).optional(),
			}),
		),
		languages: z
			.array(
				z.object({
					language: z.string(),
					fluency: z.string(),
				}),
			)
			.optional(),
		interests: z
			.array(
				z.object({
					name: z.string(),
					keywords: z.array(z.string()).optional(),
				}),
			)
			.optional(),
		references: z
			.array(
				z.object({
					name: z.string(),
					reference: z.string(),
				}),
			)
			.optional(),
		projects: z
			.array(
				z.object({
					name: z.string(),
					description: z.string(),
					highlights: z.array(z.string()).optional(),
					keywords: z.array(z.string()).optional(),
					startDate: z
						.string()
						.optional()
						.transform((str) => str ? new Date(str) : undefined),
					endDate: z
						.string()
						.nullable()
						.optional()
						.transform((str) => str ? new Date(str) : null),
					url: z.string().url().optional(),
					roles: z.array(z.string()).optional(),
					entity: z.string().optional(),
					type: z.string().optional(),
					github: z.string().url().optional(),
					isActive: z.boolean().optional(),
				}),
			)
			.optional(),
	}),
});

export const collections = {
	resume,
	skillsLibrary,
	languagesLibrary,
};
