export default interface Education {
	institution: string;
	url?: string;
	area: string;
	studyType: string;
	startDate: Date;
	endDate?: Date | null;
	score?: string;
	courses?: string[];
}
