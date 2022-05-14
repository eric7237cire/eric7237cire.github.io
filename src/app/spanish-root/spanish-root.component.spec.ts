import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanishRootComponent } from './spanish-root.component';

describe('SpanishRootComponent', () => {
  let component: SpanishRootComponent;
  let fixture: ComponentFixture<SpanishRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpanishRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpanishRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
