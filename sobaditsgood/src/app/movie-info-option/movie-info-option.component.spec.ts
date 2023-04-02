import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoOptionComponent } from './movie-info-option.component';

describe('MovieInfoOptionComponent', () => {
  let component: MovieInfoOptionComponent;
  let fixture: ComponentFixture<MovieInfoOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieInfoOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieInfoOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
