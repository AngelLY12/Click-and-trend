import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsSuggComponent } from './kids-sugg.component';

describe('KidsSuggComponent', () => {
  let component: KidsSuggComponent;
  let fixture: ComponentFixture<KidsSuggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KidsSuggComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsSuggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
