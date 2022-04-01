import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivationEnd, Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { filter, Subscription } from "rxjs";
import { LanguageService } from "../core/services/language.service";
import { ContributeProblemHomeComponent } from "./components/contribute-problem-home/contribute-problem-home.component";
import { ContributeProblemQuestionComponent } from "./components/contribute-problem-question/contribute-problem-question.component";
import { ContributeProblemSolutionComponent } from "./components/contribute-problem-solution/contribute-problem-solution.component";

@Component({
    selector: 'app-contribute-problem',
    templateUrl: './contribute-problem.component.html'
})
export class ContributeProblemComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    hideSteps: boolean = true;
    routerSubscription: Subscription;
    dictionary: any;

    constructor(router: Router, languageService: LanguageService) {
        this.routerSubscription = router.events.pipe(
            filter((event : any) => event instanceof ActivationEnd)
        ).subscribe((event : ActivationEnd) => {
            switch (event.snapshot.component) {
                case ContributeProblemQuestionComponent:
                    this.hideSteps = false;
                    break;
                case ContributeProblemHomeComponent:
                    this.hideSteps = true;
                    break;
            }
        });
        this.dictionary = languageService.dictionary;
    }

    ngOnInit(): void {
        this.items = [
            {
                label: this.dictionary.contributeProblemStep[0],
                routerLink: ['question']
            },
            {
                label: this.dictionary.contributeProblemStep[1],
                routerLink: ['solution']
            },
            {
                label: this.dictionary.contributeProblemStep[2],
                routerLink: ['testcase']
            }
        ];
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }
}