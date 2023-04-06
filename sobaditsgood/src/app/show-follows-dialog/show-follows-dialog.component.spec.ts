import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFollowsDialogComponent } from './show-follows-dialog.component';

describe('ShowFollowsDialogComponent', () => {
  let component: ShowFollowsDialogComponent;
  let fixture: ComponentFixture<ShowFollowsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFollowsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFollowsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
