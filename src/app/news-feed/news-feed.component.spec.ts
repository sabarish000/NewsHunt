import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Feed } from '../core/models/feed';

import { NewsFeedComponent } from './news-feed.component';

describe('NewsFeedComponent', () => {
  let component: NewsFeedComponent;
  let fixture: ComponentFixture<NewsFeedComponent>;
  let feed: Feed;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedComponent);
    feed = {source:{id:"google-news",name:"Google News"},author:null,title:"Sunisa Lee on Her Olympic Gold Met Gala Look | Met Gala 2021 With Emma Chamberlain | Vogue - Vogue",
    description:null,url:null,
    urlToImage:null,publishedAt:new Date("2021-09-14T03:46:07Z"),content:null}
    component = fixture.componentInstance;
    component.feed = feed;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
