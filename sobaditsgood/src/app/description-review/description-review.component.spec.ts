import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionReviewComponent } from './description-review.component';

describe('DescriptionReviewComponent', () => {
  let component: DescriptionReviewComponent;
  let fixture: ComponentFixture<DescriptionReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
