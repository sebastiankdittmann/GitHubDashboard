import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {GithubService} from '../../../../services/github.service';

@Component({
  selector: 'app-popular-repos',
  templateUrl: './popular-repos.component.html',
  styleUrls: ['./popular-repos.component.css']
})
export class PopularReposComponent implements AfterViewInit {
  title = 'Most forked repositories';
  displayedColumns = [
    'name',
    'forksCount',
    'language'
  ];
  dataSource: RepositoryTableRow[] = [];

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private _gitHubService: GithubService) {
  }

  ngAfterViewInit() {
    merge(this.sort.sortChange)
      .pipe(
        startWith({} as string[]),
        switchMap(() => {
            return this._gitHubService.SearchPublicRepositories(
              'angular',
              'forks',
              'desc'
            );
          }
        ),
        map(result => {
          console.log('Repositories:', result);

          return result.items.map(x => new RepositoryTableRow(x.name, x.forks_count, x.language ? x.language : ''));
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
  forksCount: number;
  language: string;

  constructor(name: string, forksCount: number, language: string) {
    this.name = name;
    this.forksCount = forksCount;
    this.language = language;
  }
}
