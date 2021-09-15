import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category, User } from '../core/models/category';
import { Source } from '../core/models/feed';
import { NewsapiService } from '../core/services/newsapi.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  public categories: Category[] = [];
  public user: User;
  public selectedCategory;
  public sources: Source[];
  public selectedSources: string[];
  @Output() getCategory = new EventEmitter<string>();
  @Output() getSources = new EventEmitter<string[]>();

  constructor(private newsService: NewsapiService){}

  ngOnInit(): void {
    this.categories = this.newsService.getcategories();
    this.user = this.newsService.getLoggedInUser();
    this.newsService.getSources(this.user).subscribe( result => this.sources = result);
    console.log(this.categories, this.user, this.sources);
  }
  selectCategory($event?) {
    this.categories.forEach(c => { c.name == $event.name ? c.active = true : c.active = false });
    this.selectedCategory = $event.name;
    console.log($event,"selected",this.selectedCategory);
    if(this.selectedCategory != 'All' && this.selectedSources && this.selectedSources.length > 0){
      this.selectedSources = [];
      this.getSources.emit(this.selectedSources);
    }
    this.getCategory.emit(this.selectedCategory);
  }

  selectSource($event){
    this.selectedSources = $event.value;
    if(this.selectedSources.length>0){
      this.categories.forEach(c => { c.name == 'All' ? c.active = true : c.active = false });
      this.selectedCategory = 'All';
    }
    this.getSources.emit(this.selectedSources);
    this.getCategory.emit(this.selectedCategory);
    console.log("Source selected",this.selectedSources, this.selectedCategory);
  }
}
