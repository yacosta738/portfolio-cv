/**
 * Central parsing utilities for resume data.
 * This module provides efficient, single-parse access to resume JSON data.
 * Individual collection parsers have been removed in favor of loading the complete resume.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { RawResumeData } from "./resume-types";

/**
 * Cache for parsed resume data to avoid multiple file reads
 */
let cachedResumeData: RawResumeData | null = null;

/**
 * Loads and parses the resume JSON file once, caching the result
 * @returns {RawResumeData} The parsed resume data
 */
export const getResumeData = (): RawResumeData => {
	if (cachedResumeData === null) {
		const filePath = resolve(process.cwd(), "src/data/resume/es/resume.json");
		const fileContent = readFileSync(filePath, "utf-8");
		cachedResumeData = JSON.parse(fileContent) as RawResumeData;
	}
	return cachedResumeData;
};
