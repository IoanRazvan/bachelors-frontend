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

export interface PreviousContributionRow {
    id : number;
    status: ProblemContributionRequest;
    title: string;
    createdTime: string;
}

export interface UnassignedContributionRow {
    id: number;
    contributorUsername: string;
    title: string;
    createdTime: string;
}

export interface AssignedContributionRow extends UnassignedContributionRow {
    status: ProblemContributionStatus
}

export interface AssignedContributionStatusCount {
    status: ProblemContributionStatus;
    count: number;
}