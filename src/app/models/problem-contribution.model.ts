export interface ProblemContributionRequest {
    title: string;
    description: string;
    solution: string;
    testcase: string;
}

export type ProblemContributionStatus = "PENDING" | "ACCEPTED" | "REJECTED"

export interface ProblemContributionResponse extends ProblemContributionRequest {
    id: number;
    status: ProblemContributionStatus;
    statusDetails: string;
    createdTime: string;
}