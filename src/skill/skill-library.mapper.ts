/**
 * Maps collection entries of skills to skill objects
 * @module SkillMapper
 */

import type { CollectionEntry } from "astro:content";
import type Skill from "./skill-library.model";

/**
 * Converts a single skill collection entry to a Skill object
 * @param {CollectionEntry<"skillsLibrary">} skillData - The skill collection entry to convert
 * @returns {Skill} A Skill object with id and name
 */
export function toSkill(skillData: CollectionEntry<"skillsLibrary">): Skill {
	return {
		id: skillData.id,
		name: skillData.data.name,
		icon: skillData.data.icon,
	};
}
/**
 * Converts an array of skill collection entries to Skill objects
 * @param {CollectionEntry<"skillsLibrary">[]} skills - Array of skill collection entries
 * @returns {Promise<Skill[]>} Promise that resolves to an array of Skill objects
 */
export async function toSkills(
	skills: CollectionEntry<"skillsLibrary">[],
): Promise<Skill[]> {
	return skills.map(toSkill);
}
