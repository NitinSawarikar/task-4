import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { FormControl, FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'; // Import FormGroup as well

Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public chart: any;
  chartdata: any[] = [];

  showPie: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  inputForm: FormGroup = this.fb.group({
    inputOne: new FormControl(null,   Validators.required),
    inputTwo: new FormControl(null, Validators.required)
  });

  onSubmit() {
    let newInputVal: any = 100 - Number(this.inputForm.controls?.['inputOne'].value);
    this.inputForm.controls?.['inputTwo'].setValue(newInputVal);
    this.chartdata.push(this.inputForm.controls?.['inputOne'].value, this.inputForm.controls?.['inputTwo'].value);
    this.createChart();
    this.showPie = true;
  }

  onClickClear() {
    this.inputForm.reset();
    this.showPie = false;
    this.chartdata = [];
  }

  createChart() {
    this.chart = new Chart('myChart', {
      type: 'pie',
      data: {
        labels: ['value 1', 'value 2'],
        datasets: [
          {
            label: 'Pie Chart',
            data: this.chartdata,
            backgroundColor: ['blue', 'green']
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

 
}
