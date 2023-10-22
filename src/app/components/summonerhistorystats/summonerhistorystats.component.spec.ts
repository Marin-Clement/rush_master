import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerhistorystatsComponent } from './summonerhistorystats.component';

describe('SummonerhistorystatsComponent', () => {
  let component: SummonerhistorystatsComponent;
  let fixture: ComponentFixture<SummonerhistorystatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummonerhistorystatsComponent]
    });
    fixture = TestBed.createComponent(SummonerhistorystatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
