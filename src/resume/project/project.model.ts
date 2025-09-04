export default interface Project {
	name: string;
	description: string;
	highlights?: string[];
	keywords?: string[];
	startDate?: Date;
	endDate?: Date;
	url?: string;
	roles?: string[];
	entity?: string;
	type?: string;
	github?: string;
	isActive?: boolean;
}
