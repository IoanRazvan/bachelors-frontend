export interface SubmissionRow {
    id: number;
    timestamp: string;
    statusCode: number;
    runtime: number;
    languageId: string;
}

export interface Submission {
    id: number;
    timestamp: string;
    statusCode: number;
    sourceCode: string;
    languageId: string;
}

export interface PassingSubmission extends Submission {
    runtime: number;
    acceptedDistribution: AcceptedSubmissionDistributionBin[];
}

export interface AcceptedSubmissionDistributionBin {
    runtime: number;
    count: number;
}

export interface FailedSubmission extends Submission {
    error: string;
    input: string;
    output: string;
    expected: string;
}

export interface SubmissionDateCount {
    date: string;
    count: number;
}