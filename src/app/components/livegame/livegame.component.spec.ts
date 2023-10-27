import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivegameComponent } from './livegame.component';

describe('LivegameComponent', () => {
  let component: LivegameComponent;
  let fixture: ComponentFixture<LivegameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivegameComponent]
    });
    fixture = TestBed.createComponent(LivegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
