import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerheaderComponent } from './summonerheader.component';

describe('SummonerheaderComponent', () => {
  let component: SummonerheaderComponent;
  let fixture: ComponentFixture<SummonerheaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummonerheaderComponent]
    });
    fixture = TestBed.createComponent(SummonerheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
