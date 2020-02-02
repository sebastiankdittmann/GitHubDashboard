import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {GithubService} from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Git Hub Repos';
  displayedColumns = [
    'name',
  ];
  dataSource = new MatTableDataSource();

  resultsLength = 0;

  @ViewChild(MatPaginator, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _gitHubService: GithubService) {
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
            console.log('Loading repos from api');

            return this._gitHubService.getPublicRepositoriesForUser(
              'mygeen',
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
            );
          }
        ),
        map(repos => {
          this.resultsLength = repos.length;
          console.log('Results received!', repos);

          return repos.map(x => x.name);
        }),
        catchError((err, caught) => {
          console.log('Error caught...');
          console.error(err);

          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }
}
