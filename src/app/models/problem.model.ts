import { Category, ProblemDifficulty } from "./category.model";

export interface Problem {
    title: string;
    description: string;
    solutions: ProblemSolution[];
    testcases: ProblemTestcase[];
    difficulty: ProblemDifficulty;
    categories: Category[];
}

export interface ProblemSolution {
    languageId: string;
    sourceCode: string;
}

export interface ProblemTestcase {
    input: string;
    output: string;
}

export interface ProblemRow {
    id: number;
    title: string;
    difficulty: string;
    status: string;
}

export interface ProblemReponse {
    id: number;
    title: string;
    description: string;
    starters: ProblemStarter[];
    categories: Category[];
}

export interface ProblemStarter {
    languageId: string;
    languageName: string;
    sourceCode: string;
}