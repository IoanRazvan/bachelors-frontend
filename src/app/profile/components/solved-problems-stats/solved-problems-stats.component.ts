import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LanguageService } from 'src/app/base/language.base';
import { ProblemService } from 'src/app/core/services/problem.service';
import { SolvedProblemsStats } from 'src/app/models/problem.model';

@Component({
  selector: 'app-solved-problems-stats',
  templateUrl: './solved-problems-stats.component.html',
  styleUrls: ['solved-problems-stats.components.css'],
  encapsulation: ViewEncapsulation.None
})
export class SolvedProblemsStatsComponent implements OnInit {
  loading: boolean;
  data!: SolvedProblemsStats;
  chartData!: any;
  chartOptions: any;
  dictionary: any;

  constructor(private problemService: ProblemService, languageService: LanguageService) {
    this.loading = true;
    this.chartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      cutout: 60,
      plugins: {
        legend: {
          display: false,
        }
      }
    };
    this.dictionary = languageService.dictionary;
  }

  ngOnInit(): void {
    this.problemService.getSolvedProblemsStats().subscribe((resp) => {
      this.data = resp;
      this.chartData = {
        labels: [this.dictionary.solved, this.dictionary.unsolved],
        datasets: [{
          data: [resp.solved.reduce((prev, cur) => prev + cur.count, 0), resp.total.reduce((prev, cur) => prev + cur.count, 0)],
          backgroundColor: ["#ffc107", "rgba(0, 0, 0, 0.1)"],
          hoverBackgroundColor: ["#ffcd39", "rgba(0, 0, 0, 0.1)"]
        }]
      };
      this.loading = false;
    });
  }

}
