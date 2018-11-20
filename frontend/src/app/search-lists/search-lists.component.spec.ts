import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListsComponent } from './search-lists.component';

describe('SearchListsComponent', () => {
  let component: SearchListsComponent;
  let fixture: ComponentFixture<SearchListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
