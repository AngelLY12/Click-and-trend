import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsShoppingCartComponent } from './items-shopping-cart.component';

describe('ItemsShoppingCartComponent', () => {
  let component: ItemsShoppingCartComponent;
  let fixture: ComponentFixture<ItemsShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsShoppingCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
