import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerchampionComponent } from './summonerchampion.component';

describe('SummonerchampionComponent', () => {
  let component: SummonerchampionComponent;
  let fixture: ComponentFixture<SummonerchampionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummonerchampionComponent]
    });
    fixture = TestBed.createComponent(SummonerchampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
