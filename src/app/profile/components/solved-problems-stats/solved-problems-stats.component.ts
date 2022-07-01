import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor(private problemService: ProblemService) {
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
  }

  ngOnInit(): void {
    this.problemService.getSolvedProblemsStats().subscribe((resp) => {
      this.data = resp;
      this.chartData = {
        labels: ['Solved', 'Unsolved'],
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
