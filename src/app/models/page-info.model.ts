import { Page } from "./page.model";

export interface PageInfo {
    page: number;
    first: boolean;
    last: boolean;
}

export function extractPageInfo<T>(page : Page<T>) : PageInfo {
  return {
    page: page.page + 1,
    first: page.first,
    last: page.last
  };
}