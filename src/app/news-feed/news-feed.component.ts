import { Component, Input, OnInit } from '@angular/core';
import { Feed } from '../core/models/feed';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  constructor() { }
  @Input()
  feed : Feed;
  ngOnInit(): void {
  }

  onImgError(event) { 
    event.target.src = 'assets/images/NoImage.png';
  }
}
