export interface ServerResponse<T> {
    response?: T;
    error: boolean;
}