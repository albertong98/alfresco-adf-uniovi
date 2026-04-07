import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnioviExtensionComponent } from './uniovi-extension.component';

describe('UnioviExtensionComponent', () => {
  let component: UnioviExtensionComponent;
  let fixture: ComponentFixture<UnioviExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnioviExtensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnioviExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
