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
        const chunkNumber : number = (targetPage * targetSize) / ((this.page + 1) * this.size);
        pageData.page = targetPage;
        pageData.size = targetSize;
        pageData.content = this.content.slice(chunkNumber * targetSize, (chunkNumber + 1) * targetSize);
        pageData.first = targetPage === 0;
        pageData.last = this.last && Page.convertPageNumber(targetPage + 1, targetSize, this.size) !== this.page;
        return new Page(pageData);
    }
}