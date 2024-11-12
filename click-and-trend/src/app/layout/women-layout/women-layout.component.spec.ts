import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenLayoutComponent } from './women-layout.component';

describe('WomenLayoutComponent', () => {
  let component: WomenLayoutComponent;
  let fixture: ComponentFixture<WomenLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomenLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
