import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../core/models/category';
import { Feed } from '../core/models/feed';
import { NewsapiService } from '../core/services/newsapi.service';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
  styleUrls: ['./headlines.component.css']
})
export class HeadlinesComponent implements OnInit, OnChanges {
  @Input()
  category:string = 'All';
  @Input()
  sources:string[] = [];
  user:User;
  public feeds:Feed[];
  constructor(private newsService: NewsapiService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.sources && this.sources.length > 0){
      this.newsService.getHeadLinesForSources(this.user, this.sources).subscribe(feeds => {
        this.feeds = feeds;
        console.log("Feeds", this.feeds)
      });
    }else{
      this.newsService.getHeadLines(this.user, this.category).subscribe(feeds => {
        this.feeds = feeds;
        console.log("Feeds", this.feeds)
      });
    }
  }

  ngOnInit(): void {
    this.user = this.newsService.getLoggedInUser();
  }

}
