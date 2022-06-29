import { ListProblem } from "./problem.model";

export interface UserListResponse {
    id: number;
    listTitle: string;
}

export interface UserListRow extends UserListResponse {
    containsProblem: boolean;
}

export interface UserListDetails extends UserListRow {
    problems: ListProblem[];
}