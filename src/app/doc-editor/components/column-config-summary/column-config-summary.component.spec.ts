import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnConfigSummaryComponent } from './column-config-summary.component';

describe('ColumnConfigSummaryComponent', () => {
  let component: ColumnConfigSummaryComponent;
  let fixture: ComponentFixture<ColumnConfigSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnConfigSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnConfigSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
