import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'aca-score-task',
  templateUrl: './score-task.component.html',
  styleUrls: ['./score-task.component.scss']
})
export class ScoreTaskComponent implements OnInit {

  scoreForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
