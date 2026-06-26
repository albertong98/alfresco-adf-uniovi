import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTaskComponent } from './score-task.component';

describe('ScoreTaskComponent', () => {
  let component: ScoreTaskComponent;
  let fixture: ComponentFixture<ScoreTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
