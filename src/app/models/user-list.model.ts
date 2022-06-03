export interface UserListResponse {
    id: number;
    listTitle: string;
}

export interface UserListRow extends UserListResponse {
    containsProblem: boolean;
}