import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenLayoutComponent } from './men-layout.component';

describe('MenLayoutComponent', () => {
  let component: MenLayoutComponent;
  let fixture: ComponentFixture<MenLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
