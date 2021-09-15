import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, Observer } from 'rxjs';
import { Category, User } from '../core/models/category';
import { Source } from '../core/models/feed';
import { NewsapiService } from '../core/services/newsapi.service';

import { SidemenuComponent } from './sidemenu.component';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidemenuComponent ],
      providers: [{provide: NewsapiService , useClass: MockNewsapiService}]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

var sourcesMockDate: Source[]= [{ id: "cnn", name: "CNN"}, { id: "abc", name: "ABC"}];
class MockNewsapiService {
  getSources(user: User) {
    return Observable.create((observer: Observer<Array<Source>>) => {
      observer.next(sourcesMockDate);
    });
  }
  public getcategories(): Category[]
  {
    var categories:Category[] = [{name:'All',lable:'All News',active:true},
                      {name:'business',lable:'Business',active:false},
                      {name:'entertainment',lable:'Entertainment',active:false},
                      {name:'general',lable:'General',active:false},
                      {name:'health',lable:'Health',active:false},
                      {name:'science',lable:'Science',active:false},
                      {name:'sports',lable:'Sports',active:false},
                      {name:'technology',lable:'Technology',active:false}];
    //console.log(categories);
    return categories;
  }

  public getLoggedInUser(): User{
    return {name: 'Peter', country: 'us', apiKey: 'fbiqebfiqfi62845bibf897qwfb'};
  }
}
