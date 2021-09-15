import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, Observer } from 'rxjs';
import { User } from '../core/models/category';
import { Feed } from '../core/models/feed';
import { NewsapiService } from '../core/services/newsapi.service';

import { HeadlinesComponent } from './headlines.component';

describe('HeadlinesComponent', () => {
  let component: HeadlinesComponent;
  let fixture: ComponentFixture<HeadlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadlinesComponent ],
      providers: [{provide: NewsapiService, useClass: MockNewsapiService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
var feedMockData : Feed[] = [{source:{id:"google-news",name:"Google News"},author:null,title:"Sunisa Lee on Her Olympic Gold Met Gala Look | Met Gala 2021 With Emma Chamberlain | Vogue - Vogue",
description:null,url:null,
urlToImage:null,publishedAt:new Date("2021-09-14T03:46:07Z"),content:null}]
class MockNewsapiService {
  getHeadLines(user: User, category: string){
    return Observable.create((observer: Observer<Array<Feed>>) => {
      observer.next(feedMockData);
    });
  }

  getLoggedInUser(): User{
    return {name:'Jhon',country:'us',apiKey:'aeufyqe97yf9qfbqfg9qbg'};
  }
}