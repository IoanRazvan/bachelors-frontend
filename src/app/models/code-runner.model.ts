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
    langId: string;
    input: string[];
    output: string[];
}