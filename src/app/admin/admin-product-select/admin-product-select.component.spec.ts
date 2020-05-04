import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductSelectComponent } from './admin-product-select.component';

describe('AdminProductSelectComponent', () => {
  let component: AdminProductSelectComponent;
  let fixture: ComponentFixture<AdminProductSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
