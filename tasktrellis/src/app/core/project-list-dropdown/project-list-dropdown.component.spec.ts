import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListDropdownComponent } from './project-list-dropdown.component';

describe('ProjectListDropdownComponent', () => {
  let component: ProjectListDropdownComponent;
  let fixture: ComponentFixture<ProjectListDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
