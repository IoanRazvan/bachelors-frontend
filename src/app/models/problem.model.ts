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