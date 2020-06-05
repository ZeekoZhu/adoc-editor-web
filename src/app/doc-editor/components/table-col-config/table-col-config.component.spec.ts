import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColConfigComponent } from './table-col-config.component';

describe('TableColConfigComponent', () => {
  let component: TableColConfigComponent;
  let fixture: ComponentFixture<TableColConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
