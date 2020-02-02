import {Component, OnInit} from '@angular/core';
import {GithubService} from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Git Hub Repos';

  constructor(private _gitHubService: GithubService) {
  }

  ngOnInit() {
    this._gitHubService.getPublicRepositoriesForUser('mygeen').subscribe(res => {
        console.log(res.map(repo => repo.name));
    });
  }
}
