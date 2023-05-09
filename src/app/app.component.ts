import {Component} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from "@angular/common";


@Component({
  selector: 'app-root',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  location: Location;
  title = 'sample-app';
  htmlContent ='';

  constructor(location: Location) {
    this.location = location;
  }

  async sendRequest() {
    let url = "/proxied-backend/info";
    const data = await fetch(url);
    let response = await data.json() ?? {};
    this.htmlContent= JSON.stringify(response, null, 2);
  }

  clear() {
    this.htmlContent='';
  }
}
