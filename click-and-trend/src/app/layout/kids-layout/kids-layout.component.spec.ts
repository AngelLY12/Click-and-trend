import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsLayoutComponent } from './kids-layout.component';

describe('KidsLayoutComponent', () => {
  let component: KidsLayoutComponent;
  let fixture: ComponentFixture<KidsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KidsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
