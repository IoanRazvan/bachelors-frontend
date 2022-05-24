export type SortingType = "ascending" | "descending";

export class Page<T> {
    page: number;
    size: number;
    content: T[];
    first: boolean;
    last: boolean;

    constructor(obj: any) {
        this.page = obj.page;
        this.size = obj.size;
        this.content = obj.content;
        this.first = obj.first;
        this.last = obj.last;
    }

    static convertPageNumber(targetPage: number, targetPageSize: number, inputPageSize: number) : number {
        return Math.floor(targetPage * targetPageSize / inputPageSize);
    }

    convertPage(targetPage: number, targetSize: number) : Page<T> {
        const pageData : any = {};
        const factor = Math.floor(this.size / targetSize);
        const chunkNumber : number = targetPage % factor;
        pageData.page = targetPage;
        pageData.size = targetSize;
        pageData.content = this.content.slice(chunkNumber * targetSize, (chunkNumber + 1) * targetSize);
        pageData.first = targetPage === 0;
        pageData.last = this.last && (chunkNumber + 1) * targetSize >= this.content.length;
        return new Page(pageData);
    }
}

export class SortedQueryPage<T> extends Page<T> {
    sorting: SortingType;
    query: string;

    constructor(obj : any) {
        super(obj);
        this.sorting = obj.sorting;
        this.query = obj.query;
    }
}