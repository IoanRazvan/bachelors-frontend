import { SubmissionRow } from "./submission.model";

export interface CodeRunnerResult {
    status: RunnerResultStatus;
    error: string;
    output: string;
    stdout: string;
    langId: string;
    wrongAnswer: WrongAnswer;
}

export interface CodeDetails {
    code: string;
    langId: string;
    input: string[];
    output: string[];
}

export enum RunnerResultStatus {
    ACCEPTED_ANSWER,
    COMPILE_ERROR,
    RUNTIME_ERROR,
    TIME_LIMIT_EXCEDEED,
    WRONG_ANSWER
}

export interface WrongAnswer {
    input: string;
    actual: string;
    expected: string;
}

export interface SubmissionRequest {
    sourceCode: string;
    languageId: string;
}

export interface SubmissionResponse {
    codeRunnerResult: CodeRunnerResult;
    submission: SubmissionRow;
}