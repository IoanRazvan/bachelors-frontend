export interface CodeRunnerResult {
    status: number;
    error: string;
    output: string;
    stdout: string;
    langId: number;
    wrongAnswerIdx: number;
}

export interface CodeDetails {
    code: string;
    langId: number;
    input: string[];
    output: string[];
}