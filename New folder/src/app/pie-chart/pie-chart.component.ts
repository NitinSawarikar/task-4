import { Component, OnInit } from '@angular/core';
import { Chart,registerables } from 'node_modules/chart.js'
import { FormControl,FormBuilder, Validators  } from '@angular/forms'
Chart.register(...registerables)

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit{
  public chart : any;
  chartdata : any[] =[];

  showPie : boolean = false;
  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    
  }

  inputForm = this.fb.group({
    inputOne : [Validators.required, this.maxNum],
    inputTwo : [Validators.required]
  })

  onSubmit(){
    let newInputVal : any = (100 - Number(this.inputForm.controls.inputOne.value));
    this.inputForm.controls.inputTwo.setValue(newInputVal);
    this.chartdata.push(this.inputForm.controls.inputOne.value, this.inputForm.controls.inputTwo.value);
    this.createChart(); 
    this.showPie = this.showPie
  }

  onClickClear(){
    this.inputForm.reset();
    this.showPie = !this.showPie;
    this.chartdata = [];
    window.location.reload();
  }

  createChart(){
    this.chart = new Chart('myChart',{
      type : 'pie',
      data : {
        labels : ['value 1', 'value 2'],
      datasets : [
        {
          label : "Pie Chart",
          data : this.chartdata,
          backgroundColor : ['blue', 'green']
        }
      ]
      },
      options : {
        aspectRatio : 2.5
      }
    });
  }

  maxNum(input : FormControl): any {
    if(input.value > 100){
      return { maxNum : true}
    }
    return null
  }
 
}
