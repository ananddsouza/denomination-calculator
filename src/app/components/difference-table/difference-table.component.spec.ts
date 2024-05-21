import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferenceTableComponent } from './difference-table.component';

describe('DifferenceTableComponent', () => {
  let component: DifferenceTableComponent;
  let fixture: ComponentFixture<DifferenceTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DifferenceTableComponent]
    });
    fixture = TestBed.createComponent(DifferenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
