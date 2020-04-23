import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Repository} from '../model/repositories';
import {SearchResult} from '../model/search-result';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private _apiUrl = 'https://api.github.com';

  constructor(private _httpClient: HttpClient) { }

  getPublicRepositoriesForUser(userName: string, sort: string, order: string, page: number): Observable<Repository[]> {
    return  this._httpClient.get<Repository[]>(
      `${this._apiUrl}/users/${userName}/repos?sort=${sort}&order=${order}&page=${page + 1}`
    );
  }

  SearchPublicRepositories(query: string, sort: string, order: string): Observable<SearchResult> {
    return  this._httpClient.get<SearchResult>(
      `${this._apiUrl}/search/repositories?q=${query}&sort=${sort}&order=${order}`
    );
  }
}
