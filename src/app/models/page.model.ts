import { ProblemContributionStatus } from "./problem-contribution.model";

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

export class ParamterizedPage<T> extends Page<T> {
    parameters: {[key: string] : string};

    constructor(data : any) {
        super(data);
        this.parameters = data.parameters;
    }
}

export class PageFactory {
    static of<T>(data: any) : Page<T> {
        if (data.parameters)
            return new ParamterizedPage(data);
        return new Page(data);
    }
}