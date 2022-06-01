export interface SubmissionRow {
    id: number;
    timestamp: string;
    statusCode: number;
    runtime: number;
    languageId: string;
}

export interface PassingSubmission {
    runtime: number;
}

export interface FailedSubmission {
    error: string;
    input: string;
    output: string;
    expected: string;
}