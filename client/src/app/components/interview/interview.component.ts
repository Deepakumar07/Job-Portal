import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  getinterviews:boolean;
  getcvs:boolean=true;
  getges:boolean;
  constructor() { }

  ngOnInit(): void {
  }

  getcv(){
    this.getcvs=true;
    this.getges=false;
    this.getinterviews=false;

  }

  getge(){
    this.getcvs=false;
    this.getges=true;
    this.getinterviews=false;
  }
  getinterview(){

    this.getcvs=false;
    this.getges=false;
    this.getinterviews=true;
  }
}
