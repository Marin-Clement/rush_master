import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerlistComponent } from './summonerlist.component';

describe('SummonerlistComponent', () => {
  let component: SummonerlistComponent;
  let fixture: ComponentFixture<SummonerlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummonerlistComponent]
    });
    fixture = TestBed.createComponent(SummonerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
