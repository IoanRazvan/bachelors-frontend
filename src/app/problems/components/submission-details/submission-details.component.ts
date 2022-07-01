import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/base/language.base';
import { SubmissionService } from 'src/app/core/services/submission.service';
import { CodeRunnerResult } from 'src/app/models/code-runner.model';
import { FailedSubmission, PassingSubmission, Submission } from 'src/app/models/submission.model';

@Component({
  selector: 'app-submission-details',
  templateUrl: './submission-details.component.html',
})
export class SubmissionDetailsComponent implements OnInit {
  submission!: Submission;
  loading: boolean;
  editorOptions: any;
  chartData: any;
  chartOptions: any;
  dictionary: any;
  errorStatus: number;

  constructor(private service: SubmissionService, private route: ActivatedRoute, languageService: LanguageService) {
    this.dictionary = languageService.dictionary;
    this.loading = true;
    this.errorStatus = 0;
    this.chartOptions = {
      aspectRatio: 1,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            title: (tooltipItem: any) => `(${tooltipItem[0].label} ms, ${tooltipItem[0].formattedValue})`,
            label: () => this.dictionary.runtimeDistribution
          }
        },
      },
      scales: {
        x: { grid: { display: false }, title: { display: true, text: this.dictionary.runtime + ' (ms)' } },
        y: { grid: { display: false }, title: { display: true, text: this.dictionary.count } }
      }
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.service.getSubmission(id).subscribe({
        next: (submission) => {
          this.submission = submission;
          this.loading = false;
          this.editorOptions = { theme: 'vs-light', minimap: { enabled: false }, language: submission.languageId, readOnly: true };

          if (submission.statusCode === 0)
            this.setChartData(submission)
        },
        error: (err) => {
          this.errorStatus = err.status || 1;
          this.loading = false;
        }
      })
    })
  }

  private setChartData(submission: Submission) {
    const distribution = (<PassingSubmission>submission).acceptedDistribution;
    this.chartData = {
      labels: distribution.map(bin => bin.runtime),
      datasets: [{
        label: this.dictionary.runtimeDistribution,
        data: distribution.map(bin => bin.count),
        backgroundColor: ['rgba(0, 99, 132, 0.2)'],
        barPercentage: 1.0,
        categoryPercentage: 1.0
      }]
    }
  }

  get runnerResult(): CodeRunnerResult {
    const failedSubmission: FailedSubmission = <FailedSubmission>this.submission;
    return {
      status: failedSubmission.statusCode,
      error: failedSubmission.error,
      output: failedSubmission.output,
      stdout: "",
      langId: failedSubmission.languageId,
      wrongAnswer: {
        expected: failedSubmission.expected,
        actual: failedSubmission.output,
        input: failedSubmission.input
      }
    };
  }
}
