import { Subscription } from "rxjs";
import { ContributionsService } from "../manage-contributions/services/contributions.service";
import { extractPageInfo, PageInfo } from "../models/page-info.model";
import { ToastMessageService } from "../shared/services/toast-message.service";
import { LanguageService } from "./language.base";

export abstract class DeveloperContributionsBase {
    data!: any[];
    loading: boolean;
    pageInfo!: PageInfo;
    serviceSubscription!: Subscription;
    dictionary: any

    constructor(protected service: ContributionsService, protected messageService: ToastMessageService, languageService: LanguageService) {
        this.loading = true;
        this.dictionary = languageService.dictionary;
    }

    protected setUp() {
        this.serviceSubscription = this.service.pages$.subscribe((resp) => {
            if (!resp.error) {
                this.data = <any>resp.response?.content;
                this.pageInfo = extractPageInfo(<any>resp.response);
            } else {
                this.messageService.addError("Contributiile nu au putut fi incarcate.");
            }
            this.loading = false;
        });
        this.service.change(0, { query: '', sorting: 'descending', force: true, status: '' });
    }

    onQueryChange(query: string) {
        this.service.setQuery(query);
    }

    onPageChange(page: number) {
        this.loading = true;
        this.service.change(page - 1);
    }

    onOrderChange(event: any) {
        this.loading = true;
        this.service.setSorting(event);
    }

    protected cleanup() {
        this.messageService.clear();
        this.serviceSubscription?.unsubscribe();
    }
}