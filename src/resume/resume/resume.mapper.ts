import type { CollectionEntry } from "astro:content";
import type Resume from "./resume.model";

/**
 * Maps resume collection data to Resume model
 * @param resumeData - The resume collection entry from Astro content
 * @returns A Resume model object with all required properties
 */
export function toResume(resumeData: CollectionEntry<"resume">): Resume {
	if (!resumeData?.data) {
		throw new Error("Invalid resume data: data object is missing");
	}

	const { data } = resumeData;
	if (!data.basics.name) {
		throw new Error("Invalid resume data: name is required");
	}

	return {
		id: resumeData.id,
		basics: {
			name: data.basics.name,
			label: data.basics.label,
			image: data.basics.image,
			email: data.basics.email,
			phone: data.basics.phone,
			url: data.basics.url,
			summary: data.basics.summary,
			location: data.basics.location,
			profiles: data.basics.profiles,
		},
		work: data.work,
		volunteer: data.volunteer ? data.volunteer : undefined,
		education: data.education,
		awards: data.awards ? data.awards : undefined,
		certificates: data.certificates ? data.certificates : undefined,
		publications: data.publications ? data.publications : undefined,
		skills: data.skills
			? data.skills.map((skill) => ({
					name: skill.name,
					level: skill.level ?? "",
					keywords: skill.keywords,
				}))
			: [],
		languages: data.languages ? data.languages : undefined,
		interests: data.interests ? data.interests : undefined,
		references: data.references ? data.references : undefined,
		projects: data.projects
			? data.projects.map((project) => ({
					name: project.name,
					description: project.description,
					highlights: project.highlights,
					keywords: project.keywords,
					startDate: project.startDate,
					endDate: project.endDate || undefined,
					url: project.url,
					roles: project.roles,
					entity: project.entity,
					type: project.type,
					github: project.github,
					isActive: project.isActive,
				}))
			: undefined,
	};
}

/**
 * Maps an array of resume collection data to an array of Resume models
 * @param resumes - Array of resume collection entries from Astro content
 * @returns Array of Resume model objects
 */
export function toResumes(resumes: CollectionEntry<"resume">[]): Resume[] {
	return resumes.map(toResume);
}
