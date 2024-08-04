import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardBaseComponent } from './board-base.component';
import {} from '@angular/router/testing';
import { RouterModule } from '@angular/router';

describe('BoardBaseComponent', () => {
  let component: BoardBaseComponent;
  let fixture: ComponentFixture<BoardBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardBaseComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
