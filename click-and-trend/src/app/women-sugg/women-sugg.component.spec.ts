import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenSuggComponent } from './women-sugg.component';

describe('WomenSuggComponent', () => {
  let component: WomenSuggComponent;
  let fixture: ComponentFixture<WomenSuggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomenSuggComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenSuggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
