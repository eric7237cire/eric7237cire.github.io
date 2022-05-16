import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationTestComponent } from './translation-test.component';

describe('TranslationTestComponent', () => {
  let component: TranslationTestComponent;
  let fixture: ComponentFixture<TranslationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
