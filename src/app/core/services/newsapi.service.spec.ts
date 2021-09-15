import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { NewsapiService } from './newsapi.service';
import { Feed, Source } from '../models/feed';
import { User } from '../models/category';
import { Observable } from 'rxjs';

describe('NewsapiService', () => {
  let service: NewsapiService;
  let httpTestingController: HttpTestingController;
  let user: User;
  let feed: Feed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsapiService]
    });
    service = TestBed.get(NewsapiService);
    httpTestingController = TestBed.get(HttpTestingController);
    user = {name: 'Parker', country: 'us', apiKey: 'ef39e2d319244ae98a7226d95042e2e1'};
    feed = {source:{id:"google-news",name:"Google News"},author:null,title:"Sunisa Lee on Her Olympic Gold Met Gala Look | Met Gala 2021 With Emma Chamberlain | Vogue - Vogue",
    description:null,url:null,
    urlToImage:null,publishedAt:new Date("2021-09-14T03:46:07Z"),content:null}
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return data", (done) => {
    let mockFeeds: Feed[] = [feed];
    service.getHeadLines(user, 'All').subscribe(res =>{
      console.log("Before",res);
      expect(mockFeeds).toBe(mockFeeds, 'Should check mock data');
      done();
      console.log("After",res);
    });
    const URL = 'https://newsapi.org/v2/top-headlines?pageSize=100&apiKey=ef39e2d319244ae98a7226d95042e2e1&country=us';//service.API_URL+'top-headlines?pageSize=100&apiKey='+user.apiKey+'&country=' + user.country;
    const req = httpTestingController.expectOne(URL)
    //service.getHeadLines.and.returnValue(Observable.of(successMsg));
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockFeeds);
    httpTestingController.verify();
  });
});
