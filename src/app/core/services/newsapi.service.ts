import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, User } from '../models/category';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NewsapiService {
  public API_URL = 'https://newsapi.org/v2/';
  public DEF_KEY = 'ef39e2d319244ae98a7226d95042e2e1';//'3121c75fbdd64cc8816fb87676e45937';
  public DEF_COUNTRY = 'us';
  constructor(private http: HttpClient) { }
  public getHeadLines(user: User, category: string) {
    var apiKey = user && user.apiKey ? user.apiKey : this.DEF_KEY;
    var URL = this.API_URL+'top-headlines?pageSize=100&apiKey='+apiKey;

    //Filter with country & category
    var country = user && user.country ? user.country : this.DEF_COUNTRY;
    URL = URL + '&country=' + country;
    if (category && category != 'All') {
      URL = URL + '&category=' + category;
    }

    console.log("Fetching feeds for country & category", country, category);
    console.log("Final URL: ",URL)
    return this.http.get(URL).pipe(map((result: any) => result.articles),
      catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  public getHeadLinesForSources(user: User,  sources: string[]) {
    var apiKey = user && user.apiKey ? user.apiKey : this.DEF_KEY;
    var URL = this.API_URL+'top-headlines?pageSize=100&apiKey='+apiKey;
    if(sources && sources.length > 0){
      //Filter with sources
      URL = URL + '&sources='+sources.join(',');
    }
    console.log("Fetching feeds for sources",sources);
    console.log(" Final URL: ",URL);
    return this.http.get(URL).pipe(map((result: any) => result.articles),
      catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

  public getSources(user:User){
    var FULL_URL = this.API_URL + 'sources?apiKey='+(user ? user.apiKey : this.DEF_KEY);
    return this.http.get(FULL_URL).pipe(map((result: any) => result.sources),
      catchError(error => {
        return throwError('Something went wrong!');
      }));
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
    return {name: 'Peter', country: 'us', apiKey: this.DEF_KEY};
  }
}
