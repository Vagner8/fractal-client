import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Componentsatomstable } from './componentsatomstable';

describe('Componentsatomstable', () => {
  let component: Componentsatomstable;
  let fixture: ComponentFixture<Componentsatomstable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Componentsatomstable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Componentsatomstable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
