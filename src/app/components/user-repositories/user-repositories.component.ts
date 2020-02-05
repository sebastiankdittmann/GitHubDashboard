import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {GithubService} from '../../services/github.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './user-repositories.component.html',
  styleUrls: ['./user-repositories.component.css']
})
export class UserRepositoriesComponent implements AfterViewInit {
  title = 'Git Hub Repos';
  displayedColumns = [
    'name',
    'language',
  ];
  dataSource: RepositoryTableRow[] = [];

  resultsLength = 0;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private _gitHubService: GithubService) {
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({} as string[]),
        switchMap(() => {
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

          return repos.map(x => new RepositoryTableRow(x.name, x.language ? x.language : ''));
        }),
        catchError((err, caught) => {
          console.error(err);

          return observableOf([]);
        })
      ).subscribe(data => {
      console.log('data', data);
      this.dataSource = data;
    });
  }
}

export class RepositoryTableRow {
  name: string;
  language: string;

  constructor(name: string, language: string) {
    this.name = name;
    this.language = language;
  }
}
