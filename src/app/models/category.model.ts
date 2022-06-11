export interface Category {
    id: number;
    categoryName: string;
}

export type ProblemDifficulty = "HARD" | "MEDIUM" | "EASY"

export const PROBLEM_DIFFICULTIES : ProblemDifficulty[] = ["HARD", "MEDIUM", "EASY"];