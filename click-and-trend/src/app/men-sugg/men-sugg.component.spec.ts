import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenSuggComponent } from './men-sugg.component';

describe('MenSuggComponent', () => {
  let component: MenSuggComponent;
  let fixture: ComponentFixture<MenSuggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenSuggComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenSuggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
