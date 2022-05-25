export type SortingType = "ascending" | "descending";

export class Page<T> {
    page: number;
    size: number;
    content: T[];
    first: boolean;
    last: boolean;

    constructor(data: any) {
        this.page = data.page;
        this.size = data.size;
        this.content = data.content;
        this.first = data.first;
        this.last = data.last;
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
    additional: string;

    constructor(data : any) {
        super(data);
        this.sorting = data.sorting;
        this.query = data.query;
        this.additional = data.additional
    }
}

export class PageFactory {
    static of<T>(data: any) : Page<T> {
        if (data.query || data.sorting)
            return new SortedQueryPage(data);
        return new Page(data);
    }
}