import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamedeepinfoComponent } from './gamedeepinfo.component';

describe('GamedeepinfoComponent', () => {
  let component: GamedeepinfoComponent;
  let fixture: ComponentFixture<GamedeepinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamedeepinfoComponent]
    });
    fixture = TestBed.createComponent(GamedeepinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
