import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'NewsHunt'; 
  public category:string;
  public sources:string[];

  updateCategory($event){
    this.category = $event;
    console.log("AppComponet", this.category);
  }

  updateSources($event){
    this.sources = $event;
    console.log("AppComponet", this.sources);
  }
}
